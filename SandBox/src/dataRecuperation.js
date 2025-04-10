export {getCurrentDate,getReunionRace,getRaceInformation}


function getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return `${day}${month}${year}`;
}

const date = getCurrentDate()

console.log(date)

async function getToDayReunion(date) {
    let nbReunion = 1;
    let reunion = true;
    while (reunion) {
        try {
            const response = await fetch(`/api/rest/client/1/programme/${date}/R${nbReunion}`);
            const data = await response.json();

        } catch (e) {
            reunion = false;
        }
        if (!reunion) {
            break;
        }
        console.log(nbReunion);
        nbReunion++;

    }
    console.log(nbReunion - 1);
    return nbReunion - 1;
}

async function getReunionRace(date) {
    const reunionList = [];

    const nbReunion = await getToDayReunion(date)
    let i = 1;
    while (i <= nbReunion) {
        try {
            const response = await fetch(`/api/rest/client/1/programme/${date}/R${i}`);
            const data = await response.json();
            console.log(data.courses.length);
            reunionList.push({"idReunion":i,"nbRace": data.courses.length})
        } catch (e) {
            console.error(`Error fetching data for R${i}:`, e);
        }
        i++;
    }
    console.log(reunionList);
    return reunionList;
}

async function getRaceInformation(reunion,race,date){
    try {
        const response = await fetch(`/api/rest/client/1/programme/${date}/R${reunion}/C${race}/participants`);
        const data = await response.json();
    } catch (e) {
        console.error(`Error fetching data for R${reunion} C${race}:`, e);
    }
}
