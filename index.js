const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2509-PT-David";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

let parties = [];
let selectedParty;
let rsvps = [];
let guests = [];

async function getParties() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    parties = result.data;
    console.log(parties);
    render();
  } catch (error) {
    console.error(error);
  }
}

async function getParty(id) {
  try {
    const response = await fetch(API + "/events" + id);
    const result = await response.json();
    selectedParty = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

async function getRsvps() {
  try {
    const response = await fetch(API + "/rsvps");
    const result = await response.json();
    rsvps = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

function PartyListItem(party) {
  const $party = document.createElement("li");
  if (party.id === selectedParty?.id) {
    $party.classList.add("selected");
  }
  $party.innerHTML = `
  <a href="#selected">${party.name}</a>
  `;

  $party.addEventListener("click", () => getParty(party.id));

  return $party;
}

function PartyList() {
  const $partyList = document.createElement("ul");
  $partyList.classList.add("lineup");

  const $parties = parties.map(PartyListItem);
  $partyList.replaceChildren(...$parties);

  return $partyList;
}

function PartyDetails() {
  if (!selectedParty) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a party to learn more.";
    return $p;
  }

  const $party = document.createElement("section");
  $artist.classList.add("party");
  $party.innerHTML = `
  <h3>${selectedParty.name} #${selectedParty.id}</h3>
  <figure>
    <img alt=${selectedParty.name} src=${selectedParty.imageUrl} />
  </figure>
  <p>${selectedParty.description}</p>

  `;
  return $party;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <PartyList></PartyList>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <PartyDetails></PartyDetails>
      </section>
    </main>
  `;
  $app.querySelector("PartyList").replaceWith(PartyList());
  $app.querySelector("PartyDetails").replaceWith(PartyDetails());
}

async function init() {
  await getParties();
  render();
}

init();
