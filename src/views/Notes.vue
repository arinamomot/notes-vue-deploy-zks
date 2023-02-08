<template>
  <div id="main" class="q-pa-md">
    <q-dialog v-model="modal" class="modal">
      <NoteForm @done="done()"/>
    </q-dialog>
    <q-page-sticky class="add" position="top-left" :offset="[20, 20]">
      <q-btn fab icon="add" color="red" @click="modal = true"/>
    </q-page-sticky>
    <section id="notes">
      <div v-for="note in notes" class="note-wrap" :key="note.id" @click="showModal(note)">
        <Note :note="note"/>
      </div>
    </section>
    <q-dialog v-model="modal_shown" @hide="modal_note = null; modal_shown = false" class="modal-note">
      <ModalNote :note="modal_note" @delete="deleteNote()"/>
    </q-dialog>
  </div>
</template>

<script>
import Note from "../components/Note";
import ModalNote from "../components/ModalNote";
import NoteForm from "../components/NoteForm";

export default {
  name: "Notes",
  components: {
    NoteForm,
    ModalNote,
    Note,
  },
  data() {
    return {
      notes: [],
      modal: false,
      modal_note: null,
      modal_shown: false,
    };
  },
  mounted() {
    if(this.$route.query['new'] !== undefined) {
      this.modal = true
    }
    this.render();
  },
  methods: {
    done() {
      console.log('done')
      this.modal = false;
      this.render()
    },
    render() {
      this.notes = JSON.parse(localStorage.getItem("notes"));
    },
    deleteNote() {
      this.modal_shown = false;
      this.render();
    },
    showModal(note) {
      this.modal_note = note;
      this.modal_shown = true
    }
  },
};
</script>

<style scoped>
#main {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

h3 {
  position: absolute;
  left: 60%;
}

.modal {
  background: white;
}

#notes {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
}

.note-wrap {
  order: 2;
}

.add {
  z-index: 100;
}

@media (max-width: 370px) {
  .note-wrap {
    width: 100%;
  }
}

</style>
