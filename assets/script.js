// Récupération des travaux depuis le fichier JSON
const reponse = await fetch('http://localhost:5678/api/works/');
const works = await reponse.json();
// Transformation des pièces en JSON
const valeurWorks = JSON.stringify(works);
console.log(reponse)
console.log(works)
console.log(valeurWorks)

for (let i = 0; i < works.length; i++) {
  console.log(works[i].title)
}

