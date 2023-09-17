export function modifyStyleSheet(element, selector, value) {
    // Getting the stylesheet
    const stylesheet = document.styleSheets[0];
    let elementRules;

    // looping through all its rules and getting your rule
    for (let i = 0; i < stylesheet.cssRules.length; i++) {
        if (stylesheet.cssRules[i].selectorText === element) {
            elementRules = stylesheet.cssRules[i];
        }
    }
    // modifying the rule in the stylesheet
    elementRules.style.setProperty(selector, value);
}

export function rgba(r, g, b, a = 1) {
    return `rgba(${r}, ${g}, ${b}, ${a})`
}