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

// donwload button
var downloadButton = document.querySelector('.download__icon');

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

    // update local storage
    updateLocalStorage();
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

    // render html css js
    resultArea.src = getInnerHtmlIframe(editorHtml.getValue(), editorCss.getValue(), editorJs.getValue());

    // update local storage
    updateLocalStorage();
})


// reload iframe in change
editorCss.addEventListener('input', () => {

    // render html css js
    resultArea.src = getInnerHtmlIframe(editorHtml.getValue(), editorCss.getValue(), editorJs.getValue());

    //update localStorage
    updateLocalStorage();
})


// reload iframe in change
editorJs.addEventListener('input', () => {

    // render html css js
    resultArea.src = getInnerHtmlIframe(editorHtml.getValue(), editorCss.getValue(), editorJs.getValue());

    // update local storage
    updateLocalStorage();
})


// function to make blob for iframe
const getInnerHtmlIframe = (htmlInnerHTML, cssInnerHTML, jsInnerHTMl) => {

    // iframe inner html
    const iframeBoilerPlate = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
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


// load html local storage onload
if (localStorage.getItem('htmlCodePenSaurabh')) {
    editorHtml.setValue(JSON.parse(localStorage.getItem('htmlCodePenSaurabh')));
} else {
    editorHtml.setValue('<h1>(≥o≤)</h1>');
}


// load css localstorage onload
if (localStorage.getItem('cssCodePenSaurabh')) {
    editorCss.setValue(JSON.parse(localStorage.getItem('cssCodePenSaurabh')));
} else {
    editorCss.setValue("@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');\nbody{\n  font-family:'Roboto';\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height:100vh;\n  width:100vw;\n  overflow:hidden;\n}\n\nh1{\n    color:#9CA3AF;\n    font-size:12rem;\n    letter-spacing:1rem;\n    font-weight:900;\n}");
}


// load js local storage onload
if (localStorage.getItem('jsCodePenSaurabh')) {
    editorJs.setValue(JSON.parse(localStorage.getItem('jsCodePenSaurabh')));
} else {
    editorJs.setValue("console.log('Namaskar');");
}


//  load editor theme if available in local storage
if (localStorage.getItem('themeCodePenSaurabh')) {
    let savedTheme = JSON.parse(localStorage.getItem('themeCodePenSaurabh'));
    editorHtml.setTheme(`${savedTheme}`);
    editorCss.setTheme(`${savedTheme}`);
    editorJs.setTheme(`${savedTheme}`);
    editorTheme.value = savedTheme.slice(10);
}


// local storage
function updateLocalStorage() {

    // html 
    if (editorHtml.getValue() != '\n                ') {
        localStorage.setItem('htmlCodePenSaurabh', JSON.stringify(editorHtml.getValue()));
    }

    // css
    if (editorCss.getValue() != '\n                ') {
        localStorage.setItem('cssCodePenSaurabh', JSON.stringify(editorCss.getValue()));
    }

    // javascript 
    if (editorJs.getValue() != '\n\n                ') {
        localStorage.setItem('jsCodePenSaurabh', JSON.stringify(editorJs.getValue()));
    }

    // theme
    localStorage.setItem('themeCodePenSaurabh', JSON.stringify(editorCss.getTheme()));

}


// download whole html css and js
downloadButton.addEventListener('click', () => {
    let BlobDownload = getInnerHtmlIframe(editorHtml.getValue(), editorCss.getValue(), editorJs.getValue());

    let a = document.createElement('a');
    a.href = BlobDownload;
    a.download = 'index.html';
    a.click();

})