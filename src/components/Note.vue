<template>
  <div class="note">
    <q-card class="my-card" @click="note.modal_note = true">
        <q-card-section>
          <q-item-label v-if="note.title"><b>{{ note.title }}</b></q-item-label>
          <q-item-label caption v-if="note.startDate || note.endDate"><b caption v-if="note.startDate">Start date:</b> {{ note.startDate }} <b v-if="note.endDate"> End date:</b>
            {{ note.endDate }}
          </q-item-label>
          <q-item-label caption v-if="note.startTime || note.endTime"><b caption v-if="note.startTime">Start time:</b> {{ note.startTime }} <b v-if="note.endTime"> End time:</b> {{ note.endTime }}
          </q-item-label>
        </q-card-section>

      <q-separator inset/>

        <q-card-section>
          <q-item-label v-if="note.description"><b>Description: </b>{{ note.description.substr(0, 100) }}</q-item-label>
        </q-card-section>

      <q-separator inset/>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "Note",
  props: {
    note: Object,
  }
};
</script>

<style scoped>
.note {
  cursor: pointer;
  margin: 10px auto;
  width: 350px;
}

@media screen and (max-width: 375px)  {
  .note {
    width: 96%;
    margin: 10px auto;
  }
}
</style>
