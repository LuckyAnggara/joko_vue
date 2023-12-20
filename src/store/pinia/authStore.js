/* eslint-disable no-unused-vars */
import { defineStore, getActivePinia } from 'pinia'
import axiosIns from '@/services/axios'
import { useMenuStore } from './menu'
import { useStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    /* User */
    form: {
      username: null,
      password: null,
    },
    isLoading: false,
    userData: JSON.parse(localStorage.getItem('userDataLawas')),
  }),
  getters: {
    user(state) {
      return state.userData
    },
    unitID(state) {
      return state.userData.user?.unit_id
    },
    groupID(state) {
      return state.userData.user?.unit.group_id
    },
    isAdmin(state) {
      if (state.userData.user?.role.id == 2) {
        return true
      }
      return false
    },
  },
  actions: {
    async login2() {
      this.isLoading = true
      try {
        const response = await axiosIns.post(`/login`, {
          username: this.form.username,
          password: this.form.password,
        })
        const payload = response.data.data
        sessionStorage.setItem('userData', JSON.stringify(payload))
        localStorage.removeItem('userData')
        localStorage.setItem('token', JSON.stringify(payload.token))
        localStorage.setItem('userData', JSON.stringify(payload))

        this.userData = payload.user

        const menuStore = useMenuStore()
        menuStore.updateMenu(this.userData.unit_id)

        if (response.status == 200) {
          return true
        }
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    async logout() {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/logout`)
        if (response.status == 200) {
          localStorage.removeItem('userDataLawas')
          localStorage.removeItem('token')
          localStorage.clear()

          const pinia = getActivePinia()

          pinia._s.forEach(store => {
            if (store.$id !== 'auth' && store.$id !== 'style' && store.$id !== 'main') {
              console.info(store)
              store.$reset()
            }

            // store.$reset();
          })

          setTimeout(() => {}, 500)
          return true
        } else {
          return false
        }
      } catch (error) {
        alert(error)
      } finally {
        this.isLoading = false
      }
    },
    login() {
      this.isLoading = true
      const data = this.form
      axios.post(`${axios.defaults.baseURL}auth/login`, data).then(res => {
        if (res.status === 201 || res.status === 202 || res.status === 203) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: res.data,
              icon: 'UserXIcon',
              variant: 'danger',
            },
          })
        } else {
          const userData = res.data
          localStorage.setItem('userData', JSON.stringify(res.data))
          this.$ability.update(userData.ability)
          this.$router
            .replace(getHomeRouteForLoggedInUser(userData.role))
            .then(() => {
              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: `Selamat Datang ${userData.pegawai.nama}`,
                  icon: 'CoffeeIcon',
                  variant: 'success',
                  text: `Kamu berhasil login sebagai ${userData.role.nama}. selamat bekerja!`,
                },
              })
            })
            .catch(error => {
              this.$refs.loginForm.setErrors(error.res.data.error)
            })
        }
        loader.hide()
      })
    },
    isLoggedIn() {
      const user = localStorage.getItem('userDataLawas')
      if (user) {
        this.userData = JSON.parse(user)
        return true
      }
      return false
    },
  },
})
