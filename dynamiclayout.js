/* Dynamic Layout by Filipe Fortes 
 * http://fortes.com/projects/dynamiclayout
 * 
 * Original inspiration from the Man in Blue
 * http://www.themaninblue.com/writing/perspective/2006/01/19/
 */

if (typeof dynamicLayout == 'undefined' || ! dynamicLayout)
{
    var dynamicLayout = {};
}

dynamicLayout.sizes = Array(1200,1000,800);
dynamicLayout.prefix = 'bw-';
dynamicLayout.styleMatch = RegExp(dynamicLayout.prefix + '(min|unknown|[0-9]+)', 'ig');
dynamicLayout.body = document.body;
dynamicLayout.previousWidth = null;

// Get the window width
// dynamicLayout code based on http://code.google.com/p/doctype/wiki/ArticleViewportSize
dynamicLayout.getBrowserWidth = function()
{
    if (window.innerWidth)
        return window.innerWidth;
    else if (document.documentElement && document.documentElement.clientWidth != 0)
        return document.documentElement.clientWidth;
    else if (document.body)
        return document.body.clientWidth;

    return 0;
};

dynamicLayout.getStyleName = function()
{
    var w = dynamicLayout.getBrowserWidth();
    if (w == dynamicLayout.previousWidth)
    {
        // short circuit, no change
        return null;
    }
    
    dynamicLayout.previousWidth = w;

    if (w != 0)
    {
        for(var i = 0; i < dynamicLayout.sizes.length; i++) 
        {
            s = dynamicLayout.sizes[i];
            if (w >= s)
            {
                return dynamicLayout.prefix + s;
            }
        }
        return dynamicLayout.prefix + 'min';
    }
    else
    {
        // Zero width is no good, ignore
        dynamicLayout.previousWidth = null;
    }
}

dynamicLayout.updateStyle = function()
{
    var newStyleName = dynamicLayout.getStyleName();
    if (newStyleName == null) return;
    var newClass = dynamicLayout.body.className.replace(dynamicLayout.styleMatch, '');
    dynamicLayout.body.className = newClass + ' ' + newStyleName;
};

dynamicLayout.init = function()
{
    var resizeHandler = true;

    // Find custom sizes set via querystring
    scripts = document.getElementsByTagName('script');

    for (var i = 0; i < scripts.length; i++)
    {
        s = scripts[i];
        if ((s.src) && (s.src.match(/dynamiclayout(-[0-9]\.[0-9])?(\.min)?\.js/)))
        {
            var sizes = (s.src.match(/sizes=([0-9]|,)+/));
            if (sizes)
            {
                sizes = sizes[0].split('=')[1].split(',');
                // Sort into descending order
                sizes.sort(function s(a,b) { return parseInt(b) - parseInt(a); });
                dynamicLayout.sizes = sizes;
            }

            resizeHandler = (s.src.match(/noresize/) == null);
            break;
        }
    }

    if (resizeHandler)
    {
        // Attach the resize handler
        if (typeof window.addEventListener != 'undefined')
            window.addEventListener('resize', dynamicLayout.updateStyle, false);
        else
            window.attachEvent('onresize', dynamicLayout.updateStyle);
    }

    dynamicLayout.updateStyle();
};

dynamicLayout.init();
