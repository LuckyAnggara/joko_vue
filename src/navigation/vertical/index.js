/*

Array of object

Top level object can be:
1. Header
2. Group (Group can have navItems as children)
3. navItem

* Supported Options

/--- Header ---/

header

/--- nav Grp ---/

title
icon (if it's on top level)
tag
tagVariant
children

/--- nav Item ---/

icon (if it's on top level)
title
route: [route_obj/route_name] (I have to resolve name somehow from the route obj)
tag
tagVariant

*/
import admin from './admin'
import dashboard from './dashboard'
import keuangan from './keuangan'
import kepegawaian from './kepegawaian'
import umum from './umum'
import laporan from './laporan'
import superuser from './superuser'

// Array of sections
export default [...dashboard, ...keuangan, ...kepegawaian, ...umum, ...admin, ...laporan, ...superuser]
