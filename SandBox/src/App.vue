<template>
  <h1>Turf Information Display</h1>
  <select v-model="selectedReunion" @change="isResetClicked = false">
    <option
        v-for="reunion in reunionRaceList"
        :key="reunion.idReunion"
        :value="reunion.idReunion"
    >
      Reunion {{ reunion.idReunion }}
    </option>
  </select>

  <select v-model="selectedRace" :disabled="!selectedReunion" @change="isResetClicked = false">
    <option
        v-for="race in getRaces(selectedReunion)"
        :key="race"
        :value="race"
    >
      Race {{ race }}
    </option>
  </select>

  <button @click="resetSelections">Reset</button>

  <label v-if="!selectedReunion || !selectedRace">
    Selected race: no race selected yet
  </label>
  <label v-else>
    Selected race: R{{ selectedReunion }} C{{ selectedRace }}
  </label>

  <button
      :disabled="(!selectedReunion && !selectedRace)"
      @click="validateRace"
  >
    Validate
  </button>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { getCurrentDate, getReunionRace } from "./dataRecuperation";

const date = getCurrentDate();
const reunionRaceList = ref([]);
const selectedReunion = ref(null);
const selectedRace = ref(null);
const isResetClicked = ref(false);

onMounted(async () => {
  reunionRaceList.value = await getReunionRace(date);
});

const getRaces = (reunionId) => {
  const reunion = reunionRaceList.value.find(r => r.idReunion === reunionId);
  return reunion ? Array.from({ length: reunion.nbRace }, (_, i) => i + 1) : [];
};

const resetSelections = () => {
  selectedReunion.value = null;
  selectedRace.value = null;
  isResetClicked.value = true;
};

const validateRace = () => {
  // Add your validation logic here
  console.log("Race validated:", selectedReunion.value, selectedRace.value);
};
</script>



