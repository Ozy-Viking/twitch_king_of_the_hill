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

/**
 * Generates a random number between min and max.
 * @param {number} min - The minimum value inclusive.
 * @param {number} max - The maximum value exclusive.
 * @returns {number} A random integer.
 */
export function Randomizer(min, max) { return min + Math.floor(Math.random() * (max - min)); };

/**
 * Deletes an HTML element.
 * @param {string} ID - ID of the element to be deleted.  
 * @param {boolean} debug - Console.log(element) before deleting  
 */
export function removeElement(ID, debug = false) {
    if (debug) { console.log("ID", ID) }
    let element = document.getElementById(ID)
    if (debug) { console.log("element", element) }
    element.remove()
};

export function boolSwitch(value) {
    return value == true ? false : true
}

export function redirectBrowser(url = "about:blank") {
    document.location.assign(url);
}

export const sides = ['left', 'right'];

export function randomSide(side = null) {
    if (side) { return side }
    side = sides[Math.floor(Math.random() * 2)]
    return side;
};
