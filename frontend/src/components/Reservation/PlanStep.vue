<script setup>
import { ref } from 'vue';
import Step from './Step.vue';
import Plan from '@/store/PlanStore.js';
import AmmountOfPeopleStep from '@/components/Reservation/AmmountOfPeopleStep.vue';
import Reservation from '@/store/ReservationStore.js';

const emit = defineEmits(['next']);

const builderText = ref({
    heading: 'Pick a name and time for your plan!',
    text: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab reiciendis aliquid enim voluptatum molestias maxime voluptate, quae repellat quidem laboriosam eveniet aut perspiciatis odio minus dolorum voluptatem error, deleniti ducimus!</p>'
});

const showButton = ref(true);
const isPlanNameEmpty = ref(false);
const isDateEmpty = ref(false);
const isAOPEmpty = ref(false);

const validateYear = () => {
    isDateEmpty.value = false;
    const date = Reservation.value.ReservationTime;
    console.log(date);
}

const clickHandle = () => {
    if(!Plan.value.PlanName){
        isPlanNameEmpty.value = true;
        return;
    }
    if(!Reservation.value.ReservationTime){
        isDateEmpty.value = true;
        return;
    }
    if(!Reservation.value.AmmoutOfPeople){
        isAOPEmpty.value = true;
        return;
    }
    emit('next');
    showButton.value = false;
}

</script>

<template>
    <Step :builderText="builderText">    
        <div class="PlanStepItem">
            <div v-if="isPlanNameEmpty" class="Error">
                Plan name has to be filled
            </div> 
            <div class="PlanStepItem-input">
                <label for="plan-name">
                    PlanName:
                </label>
                <input 
                    type="text" 
                    name="plan-name" 
                    id="plan-name" 
                    v-model="Plan.PlanName" 
                    required 
                    @change="isPlanNameEmpty = false">
            </div>
        </div>
        <div class="PlanStepItem">
            <div v-if="isDateEmpty" class="Error">
                Date has to be filled
            </div> 
            <div class="PlanStepItem-input">
                <label for="arrival-date">
                    ArrivalDate:
                </label>
                <input 
                    type="datetime-local"
                    name="arrival-date" 
                    @change="validateYear" 
                    v-model="Reservation.ReservationTime" 
                    required >    
            </div>
        </div>
        <div class="PlanStepItem">
            <div v-if="isAOPEmpty" class="Error">
                Amout of people has to be greater than 0
            </div> 
            <div class="PlanStepItem-input">
                <label for="amount-of-people">
                    Amout of people:  
                </label>
                <input 
                    type="number"
                    v-model="Reservation.AmmoutOfPeople"
                    step="1" 
                    min="1" 
                    max="4" 
                    @change="isAOPEmpty = false" 
                    id="amount-of-people" 
                    name="amount-of-people" >
            </div>
        </div>
    </Step>

    <AmmountOfPeopleStep v-if="false" />

    <div v-if="showButton" class="Button-next" @click="clickHandle">Next -></div>
</template>

<style lang="scss">
@import '@/styles/sass/Reservation/Builder.scss';

.BuilderItem{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.PlanStepItem{
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &-input{
        display: grid;
        grid-template-columns: 16rem 1fr;;
    }
}
</style>