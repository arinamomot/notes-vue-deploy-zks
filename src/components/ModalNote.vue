<template>
  <div class="modal-note-div">
    <q-card>
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
        <q-item-label v-if="note.description"><b>Description: </b>{{ note.description }}</q-item-label>
      </q-card-section>

      <q-separator inset/>

      <q-card-section>
        <q-item-label v-if="note.location"><b>Location: </b>{{ note.location }}</q-item-label>
        <q-item-label v-if="note.url"><b>URL: </b>{{ note.url }}</q-item-label>
      </q-card-section>

      <q-card-section>
        <q-btn class="q-ma-md" @click="deleteNote" label="Delete" type="submit" color="primary"/>
      </q-card-section>


      <!--    </q-card-section>-->
    </q-card>
  </div>
</template>


<script>
export default {
  name: "ModalNote",
  props: {
    note: Object
  },
  methods: {
    deleteNote() {
      let notes = JSON.parse(localStorage.getItem("notes") || "[]")
      let filteredNotes = notes.filter((n) => n.id !== this.note.id);
      localStorage.setItem("notes", JSON.stringify(filteredNotes));
      this.$emit('delete');
    }
  }
}
;
</script>

<style scoped>
.modal-note-div {
  cursor: pointer;
  margin: 10px;
  width: 500px;
}
</style>