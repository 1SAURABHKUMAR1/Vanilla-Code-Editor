// button used to hide box
var htmlButton = document.querySelector('.htmlButton');
var cssButton = document.querySelector('.cssButton');
var jsButton = document.querySelector('.jsButton');


// html css js box to hide and show
var htmlContainerToHideShow = document.querySelector('.htmlBox');
var cssContainerToHideShow = document.querySelector('.cssBox');
var jsContainerToHideShow = document.querySelector('.jsBox');


// result area aka iframe
var resultArea = document.querySelector('.resultContainer');


// editor theme to choose ie menu 
var editorTheme = document.querySelector('#header__themeMenu');


// boolean value used to show and hide
var htmlActive = true;
var cssActive = true;
var jsActive = true;


// require for extra languages ace editor 
ace.require("ace/ext/language_tools");


// editor for html 
var editorHtml = ace.edit('htmlContainer');
editorHtml.setTheme("ace/theme/xcode");
editorHtml.setFontSize('15.5px');
editorHtml.session.setMode("ace/mode/html");


// editor for css
var editorCss = ace.edit('cssContainer');
editorCss.setTheme("ace/theme/xcode");
editorCss.setFontSize('15.5px');
editorCss.session.setMode("ace/mode/css");


// editor for js
var editorJs = ace.edit('jsContainer');
editorJs.setTheme("ace/theme/xcode");
editorJs.setFontSize('15.5px');
editorJs.session.setMode("ace/mode/javascript");


// changing editor theme
editorTheme.addEventListener('input', () => {
    editorHtml.setTheme(`ace/theme/${editorTheme.value}`);
    editorCss.setTheme(`ace/theme/${editorTheme.value}`);
    editorJs.setTheme(`ace/theme/${editorTheme.value}`);
})


// html active --> true --> show box
// html active --> false --> hide box
// active deactive html box area
htmlButton.addEventListener('click', () => {

    htmlActive = !htmlActive;

    if (htmlActive) {
        htmlContainerToHideShow.style.display = 'block';
    } else {
        if (cssActive == true || jsActive == true) {
            htmlContainerToHideShow.style.display = 'none';
        }
    }

})


//active deactive css Area
cssButton.addEventListener('click', () => {

    cssActive = !cssActive;

    if (cssActive) {
        cssContainerToHideShow.style.display = 'block';
    } else {
        if (htmlActive == true || jsActive == true) {
            cssContainerToHideShow.style.display = 'none';
        }
    }

})


//active deactive js Area
jsButton.addEventListener('click', () => {

    jsActive = !jsActive;

    if (jsActive) {
        jsContainerToHideShow.style.display = 'block';
    } else {
        if (htmlActive == true || cssActive == true) {
            jsContainerToHideShow.style.display = 'none';
        }
    }

})


// reload iframe in change
editorHtml.addEventListener('input', () => {
    resultArea.src = getInnerHtmlIframe(editorHtml.getValue(), editorCss.getValue(), editorJs.getValue());
})


// reload iframe in change
editorCss.addEventListener('input', () => {
    resultArea.src = getInnerHtmlIframe(editorHtml.getValue(), editorCss.getValue(), editorJs.getValue());
})


// reload iframe in change
editorJs.addEventListener('input', () => {
    resultArea.src = getInnerHtmlIframe(editorHtml.getValue(), editorCss.getValue(), editorJs.getValue());
})


// function to make blob for iframe
const getInnerHtmlIframe = (htmlInnerHTML, cssInnerHTML, jsInnerHTMl) => {

    // iframe inner html
    const iframeBoilerPlate = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                ${cssInnerHTML}
            </style>
        </head>
        <body>
            ${htmlInnerHTML}
            <script>
                ${jsInnerHTMl}
            </script>
        </body>
        </html>
        `;

    const htmlFinalBlob = new Blob([iframeBoilerPlate], { type: 'text/html' });
    return URL.createObjectURL(htmlFinalBlob);

}