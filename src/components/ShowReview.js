function createMarkup() { return {__html: editorHtmlValue}; };

<div dangerouslySetInnerHTML={createMarkup()} />