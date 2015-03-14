Dynamic Layout is a simple library that allows you to easily adjust page layout based on the current browser width.

The script works by modifying the `class` property on the `body` element, adding a new class name that will look something like `bw-1000`, where `1000` is one of the numbers in a predefined list of possible browser widths.

By default, the script uses three window sizes: 800px, 1000px, and 1200px. Dynamic layout chooses the largest possible size that fits within the window. If the window width is smaller than the smallest specified width, the `bw-min` value will be used as the class name.

Here's a live demo: http://static.fortes.com/projects/dynamiclayout/demos/dynamicholygrail.html (resize your browser to widths of 600, 800, and 1000)

Full documentation available at: http://fortes.com/projects/dynamiclayout