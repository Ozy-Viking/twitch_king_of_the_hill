// @ts-nocheck
/**
 * Returns the requested style sheet. If there is only 1 sheet ot title left blank it will return that sheet.
 * @param {string} title - The unique title of the stylesheet.
 * @returns {CSSStyleSheet} The requested style sheet.
 */
export function getStyleSheet(title = "") {
    if (document.styleSheets.length === 1 || title === "") {
        return document.styleSheets[0]
    }
    for (const sheet of document.styleSheets) {
        console.log(sheet.title)
        if (sheet.title === title) {
            return sheet;
        }
    }
}

/**
 * Modifies a select part of a stylesheet.
 * @param {string} element - The element of the css style sheet e.g "div".
 * @param {string} selector - The selector of the element e.g "font-size".
 * @param {string} value - The value to be set.
 * @param {string} stylesheetTitle - The title of the style sheet. If left empty, the first style sheet will be choosen.
 */
export function modifyStyleSheet(element, selector, value, stylesheetTitle = "") {
    // Getting the stylesheet
    const stylesheet = getStyleSheet(stylesheetTitle);
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

/**
 * Generates a random number between min and max.
 * @param {number} min - The minimum value inclusive.
 * @param {number} max - The maximum value exclusive.
 * @returns {number} A random integer.
 */
export function Randomizer(min, max) { return min + Math.floor(Math.random() * (max - min)); };


export function rgba(r, g, b, a = 1) {
    return `rgba(${r}, ${g}, ${b}, ${a})`
}

export function boolSwitch(value) {
    return value == true ? false : true
}

export function redirectBrowser(url = "about:blank") {
    document.location.assign(url);
}

export const sides = ['left', 'right'];

/**
 * Returns a random side.
 * @param {string | null} side - When a side is passed in, side != null, it will be returned. 
 * @return {"left"|"right"} A string literal of either "left" or "right". 
 */
export function randomSide(side = null) {
    if (side) { return side }
    // @ts-ignore
    side = sides[Math.floor(Math.random() * 2)]
    return side;
};

/**
 * Deletes an HTML element.
 * @param {string} ID - ID of the element to be deleted.  
 * @param {boolean} debug - Console.log(element) before deleting  
 */
export function removeElement(ID, debug = false) {
    if (debug) { console.debug("ID", ID) }
    let element = document.getElementById(ID)
    if (element === null) { }
    if (debug) { console.debug("element", element) }
    try {
        // @ts-ignore
        element.remove()
    } catch (error) {
        console.error(ID, element, error)
    }
};

export function emptyFunction() { }