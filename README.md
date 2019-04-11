# qsKPIContainer
KPI Container extension of QlikSense

This is the the QlikSense extension to make user to create KPI with rich content.

# Function
Cell concept is defined a cell in container\. qsKPIContainer defines the extension as 100*100 coordinate\. You can also take it as 100% \* 100%\.

you can add cells to the chart freely\. 
specify the left/top/width/height in the property page\. 
## cell supports 2 type: text and chart\.
* text: you can set text or select predefined image in the cell\. also, you can set font size, weight, color etc\. for the text\.
* chart: you can embed the QlikSense chart into the cell\.
## Action: you can add action for a cell
* Navigate to other sheet
*  Set a variable
*  Lock/Unlock a field
*  Select/Unselect a field
*  Show dialog and customize the message in the dialog
*  show a popover
*  open a website
with action, you can use this extention to create a menu or button
   

## Please see below demo

* KPI
  for the embeded chart, you need to create a chart firstly, then copy the chart to the visual cell.
![KPI](https://github.com/manan5035/qsKPIContainer/blob/master/sample/KPIDemo.png)

* Show/Hide chart.
  use a KPI to switch a variable between 0 and 1 and use 0 and 1 to switch 2 visual cells with bar chart and line chart. in below demo, both bar chart / line chart and button is created with this extension.
 ![showhidechart](https://github.com/manan5035/qsKPIContainer/blob/master/sample/showhidechart.png)
 
* Dialog
  set an action for a visual cell to show a dialog.
  ![dialog](https://github.com/manan5035/qsKPIContainer/blob/master/sample/dialog.png)
  
* Set variable
  set an action to set a variable's value.
  ![setvariable](https://github.com/manan5035/qsKPIContainer/blob/master/sample/setvariable.png)
  
* Popover
  set an action to show popover when move the mouse over the entire chart.
  ![popover](https://github.com/manan5035/qsKPIContainer/blob/master/sample/popover.png)
  
* Open web
  set an action to open a web in brower.
  ![openweb](https://github.com/manan5035/qsKPIContainer/blob/master/sample/openweb.png)
