Observer
============

Observer is a platform for creating dashboards and widgets.

It's an attend to simplify the process of building dashboard.
Allowing user to create custom widget to put on their dashboard online without the need to dig into source files and make deployments.

__Current features:__
- mysql queries
- Custom HTML/CSS/Javascript widgets
- jqPlot charts with datetime chart helpers

__To do/Roadmap:__
- tests!
- MongoDB support
- Reuseable widget templates (So many widgets can use share the same widget codes)
- Built in support for polling data/widget updates without refreshing the whole widget
- Integrate more jqPlot charts in the Observer api. e.g. Bar charts
- Mobile dashboard mode
- Better display of dashboard on fullscreen

Development setup:
--
__dependencies:__
- ruby 2.0.0+
- sqlite

__Instructions:__

git checkout {{this repo}}

bundle install

script/observer


Overview
--

Observer is made up 3 components
- Data source (Database queries or external resources(e.g. twitter feed))
- Widget (HTML/CSS/javascript)
- Dashboard

Data source
---
Coming soon...

Widget
--
Coming soon...

Dashboard
--
Coming soon...


