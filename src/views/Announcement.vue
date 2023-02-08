<template>
  <div class="q-pa-md" >
    <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
    <q-input ref="title" label="Title"
             placeholder="Holidays" filled clearable
               v-model="title"
               type="text"
               hint="Title *"
               lazy-rules
               :rules="[ val => val && val.length > 0 || 'Please enter the title']"
      />
      <q-input ref="location" label="Location" filled clearable
               v-model="location"
               type="text"
               hint="Location"
               lazy-rules
               :rules="[ val => val && val.length > 0 || 'Please enter the location']"
      />

      <div class="date">
      <div class="start">
        <p class="text-subtitle2 text-center">Start date:</p>
      <q-input class="startTime" v-model="startTime" filled type="time" hint="Start time" />
      <q-input class="startDate" ref="date" v-model="startDate" filled type="date" hint="Start date" clearable/>
      </div>
      <div class="end">
        <p class="text-subtitle2 text-center">End date:</p>
      <q-input class="endTime" v-model="endTime" filled type="time" hint="End time" />
      <q-input class="endDate" ref="date" v-model="endDate" filled type="date" hint="Start date" clearable/>
      </div>
      </div>
      <q-input ref="description" filled clearable
               label="Description"
               v-model="description"
               type="textarea"
               placeholder="Best holidays in the Maldives"
               autogrow
               hint="Description *"
               lazy-rules
               :rules="[ val => val && val.length > 0 || 'Please enter your description']"
      />
      <q-input ref="url" label="URL" filled clearable
               v-model="url"
               type="url"
               hint="URL"
      />


      <p class="text-subtitle2 text-center">Additional file for note:</p>
      <q-uploader elevated class="file"
                  label="Document: "
                  multiple
                  max-files="3"
                  accept=".jpg, .png, .jpeg, image/*, .pdf, .docx, .zip, .rar"
      />
      <div>
        <q-btn label="Add note" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
      </div>

    </form>

  </div>
</template>

<script>

export default {
  name: "Announcement",
  data() {
    return {
      //TODO
      description: null,
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.q-pa-md, .file{
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.date {
  position: center;
  display: flex;
  flex-wrap: wrap-reverse;
  flex-flow: wrap;
}

.start{
  position: relative;
  left: 0;
  margin: 10px 10px 10px 0;
  flex-grow: 2;
}

.end{
  position: relative;
  right: 0;
  flex-grow: 2;
  margin: 10px 0 10px 10px;
}
</style>