<template>
  <div class="note-form">
    <q-card class="card">
      <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset">
        <q-input
            ref="title"
            label="Title"
            placeholder="Holidays"
            filled
            clearable
            v-model="title"
            type="text"
            hint="Title *"
            required
            :rules="[(val) => (val && val.length > 0 && val.length < 101) || 'Please enter the title (max 100 chars)']"
        />
        <q-input
            ref="location"
            label="Location"
            filled
            clearable
            v-model="location"
            type="text"
            hint="Location"
            :rules="[(val) => (val && val.length > 0 && val.length < 101 && new RegExp(/^[\w\s]*$/).test(val)) || 'Please enter the location']"
        />

        <div class="date">
          <div class="start">
            <p class="text-subtitle2 text-center">Start date:</p>
            <q-input class="startTime" v-model="startTime" filled clearable type="time" hint="Start time"/>
            <q-input
                class="startDate"
                ref="date"
                v-model="startDate"
                filled
                type="date"
                hint="Start date"
                clearable
            />
          </div>
          <div class="end">
            <p class="text-subtitle2 text-center">End date:</p>
            <q-input class="endTime" v-model="endTime" filled clearable type="time" hint="End time"/>
            <q-input class="endDate" ref="date" v-model="endDate" filled type="date" hint="End date" clearable/>
          </div>
        </div>
        <q-input
            ref="description"
            filled
            clearable
            label="Description"
            v-model="description"
            type="textarea"
            placeholder="Best holidays in the Maldives"
            autogrow
            required
            hint="Description *"
            :rules="[(val) => (!!val && val.length > 0 && val.length < 501) || 'Please enter the description (max 500 chars)']"
        />
        <q-input ref="url" label="URL" filled clearable v-model="url" type="url" hint="URL"/>
        <div>
          <q-btn class="q-ma-md" label="Add note" type="submit" color="primary"/>
          <q-btn class="q-ma-md" label="Reset" type="reset" color="primary" flat/>
        </div>
      </form>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "NoteForm",
  data() {
    return {
      title: "",
      location: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      description: null,
      url: "",
    };
  },
  mounted() {
  },
  methods: {
    validateTime() {

    },
    onSubmit() {
      let note = {
        id: Date.now(),
        title: this.title,
        location: this.location,
        startDate: this.startDate,
        endDate: this.endDate,
        startTime: this.startTime,
        endTime: this.endTime,
        description: this.description,
        url: this.url
      };
      let notes = JSON.parse(localStorage.getItem("notes") || "[]");
      notes.push(note);
      localStorage.setItem("notes", JSON.stringify(notes));
      this.$emit('done')
      this.onReset();
    },
    onReset() {
      this.title = null
      this.location = null
      this.startDate = null
      this.endDate = null
      this.startTime = null
      this.endTime = null
      this.description = null
      this.url = null

      // this.$refs.title.resetValidation()
      // this.$refs.location.resetValidation()
      // this.$refs.startDate.resetValidation()
      // this.$refs.endDate.resetValidation()
      // this.$refs.startTime.resetValidation()
      // this.$refs.endTime.resetValidation()
      // this.$refs.description.resetValidation()
      // this.$refs.url.resetValidation()
    },
  }
}
</script>

<style scoped>

.note-form{
  width: 500px;
}

.card{
  width: 100%;
}

form {
  border: 1px solid lightgray;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  padding: 20px;
}

.date {
  /*position: center;*/
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
}

.start {
  position: relative;
  left: 0;
  margin: 5px;
  width: 47%;
}

.end {
  position: relative;
  right: 0;
  margin: 5px;
  width: 47%;
}

@media (max-width: 600px) {
  form {
    width: 100%;
  }

  .date {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 100%;
  }

  .start, .end {
    width: 100%;
    margin: auto;
  }
}
</style>
