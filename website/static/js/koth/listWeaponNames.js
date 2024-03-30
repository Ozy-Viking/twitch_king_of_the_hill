import { weaponNames } from "./weapons.js";


export default function listActiveWeaponName() {
    let command = `Type one of the following weapons to use them:`

    for (let i in weaponNames) {
        command += `
- ${weaponNames[i]}`
    }
    console.log(command)
}
