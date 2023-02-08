<template>
  <div class="q-pa-md" style="max-width: 300px">
    <form @submit.prevent.stop="onSubmit" class="q-gutter-md">
      <div class="profile-photo">
        <img height="240" alt="photo" src="../assets/no-avatar.png">
        <q-uploader elevated class="photo"
                    label="Profile photo: "
                    multiple
                    max-files="1"
                    accept=".jpg, .png, .jpeg, image/*"
        />
      </div>
      <!--      <div class="form-control">-->
      <!--        <label class="header">Profile Photo:</label>-->

      <!--        <input id="image" class="upload" type="file" name="profile_photo" placeholder="Photo" required="" capture/>-->
      <!--        <q-btn label="Upload" type="upload" color="primary"/>-->
      <!--      </div>-->

      <!--      <label>File-->
      <!--        <input type="file" id="file" ref="file" v-on:change="onChangeFileUpload()"/>-->
      <!--      </label>-->


      <div class="fullname">
        <q-input class="name" ref="name" clearable filled
                 v-model="name"
                 hint="Name"
                 label="Name *"
                 lazy-rules
                 :rules="[ val => !!val && val.length > 1 && !!val || 'Please enter your name']"
        />

        <q-input class="surname" ref="surname" clearable filled
                 v-model="surname"
                 label="Surname *"
                 hint="Surname"
                 lazy-rules
                 :rules="[ val => !!val && val.length > 1 || 'Please enter your surname']"
        />
      </div>

      <div class="communication">
      <q-input class="email" label="Email *" filled disable
               v-model="email"
               type="email"
               hint="Email"
      />

        <q-input class="social" ref="social" clearable filled
                 v-model="social"
                 type="url"
                 label="Social network"
                 hint="Link to a social network(Facebook, Instagram, ...)"
        />
      </div>

      <div class="date-city">
        <q-input class="date" ref="date" v-model="date" filled type="date" hint="Date of birth" clearable
                 lazy-rules
                 :rules="[ val => !!val && val.length > 0 || 'Please enter your date of birth']"/>


        <q-select ref="city" class="city" filled clearable :value="city" use-input hide-selected fill-input
                  input-debounce="0"
                  :options="cities"
                  @filter="filterCity"
                  @input-value="setCity"
                  hint="City where I study"
                  label="City *"
                  lazy-rules
                  :rules="[ val => !!val && val.length > 1 || 'Please enter your city']"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <!--      <q-input ref="university" clearable filled-->
      <!--               v-model="university"-->
      <!--               hint="University where you study"-->
      <!--               label="University *"-->
      <!--               mask="S"-->
      <!--               lazy-rules-->
      <!--               :rules="[ val => !!val && val.length > 1 || 'Please enter your university']"-->
      <!--      />-->
      <div class="study">
      <q-select ref="university" class="univer" clearable filled :value="university" use-input hide-selected fill-input
                input-debounce="0"
                :options="universities"
                @filter="filterUniver"
                @input-value="setUniver"
                label="University *"
                hint="University where I study"
                lazy-rules
                :rules="[ val => !!val && val.length > 1 || 'Please enter your city']"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>

        <q-input class="program" ref="program" clearable filled
                 v-model="program"
                 hint="Study program"
                 label="Study program"
        />
  </div>

  <div class="pass">
    <q-input class="pass1" ref="password" v-model="password" label="Password *"
             filled clearable
             :type="isPwd ? 'password' : 'text'"
             hint="Current password"
             lazy-rules
             :rules="[ val => !!val && val.length > 7 || 'Please enter password']">
      <template v-slot:append>
        <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
        />
      </template>
    </q-input>

    <q-input class="pass2" ref="password2" v-model="password2" label="New password *"
             filled clearable
             :type="isPwd ? 'password' : 'text'"
             hint="New password: Use a combination of letters, numbers, and symbols - a total of at least 8 characters">
      <template v-slot:append>
        <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
  </div>

  <q-input ref="textarea" filled
           v-model="text"
           type="textarea"
           placeholder="I am responsible and hardworking person.."
           hint="Information about me"
           autogrow
  />

  <div>
    <q-btn label="Change" type="submit" color="primary"/>
    <!--        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>-->
  </div>
  </form>
  </div>
</template>

<script>
const Cities = [
  'Prague', 'Brno', 'Pardubice', 'Olomouc', 'Pilsen', 'Liberec', 'Ostrava']

const Universities = [
  'Czech Technical University (CTU)', 'Masaryk University', 'Charles University', 'Czech University of Life Sciences', 'Palacký University', 'Brno University of Technology (BUT)', 'University of South Bohemia', 'University of Ostrava',
  'Technical University of Liberec', 'University of West Bohemia', 'University of Pardubice', 'Prague University of Economics and Business'
]

export default {
  name: "Profile",
  data() {
    return {
      name: null,
      surname: null,
      email: null,
      program: null,
      password: null,
      password2: null,
      date: null,
      textarea: null,
      social: null,
      isPwd: true,
      hasError: false,
      formHasError: false,

      city: null,
      cities: Cities,
      university: null,
      universities: Universities
    }
  },

  methods: {
    onSubmit() {
      this.$refs.name.validate()
      this.$refs.surname.validate()
      this.$refs.university.validate()
      this.$refs.city.validate()
      // this.$refs.email.validate()
      this.$refs.program.validate()
      this.$refs.password.validate()
      this.$refs.password2.validate()
      this.$refs.date.validate()
      this.$refs.textarea.validate()

      if (this.$refs.name.hasError || this.$refs.surname.hasError || this.$refs.program.hasError || this.$refs.password.hasError || this.$refs.password2.hasError || this.$refs.city.hasError || this.$refs.university.hasError || this.$refs.date.hasError || this.$refs.textarea.hasError) {
        this.formHasError = true
        this.$q.notify({
          color: 'negative',
          message: 'Please check and fill the form correctly',
          position : 'bottom-right'
        })
      } else {
        this.$q.notify({
          icon: 'done',
          color: 'positive',
          message: 'Changed',
          position : 'bottom-right'
        })
      }
    },

    onReset() {
      this.name = null
      this.surname = null
      this.program = null
      this.city = null
      this.university = null
      this.password = null
      this.password2 = null
      this.email = null
      this.date = null
      this.textarea = null

      this.$refs.name.resetValidation()
      this.$refs.surname.resetValidation()
      this.$refs.city.resetValidation()
      this.$refs.university.resetValidation()
      this.$refs.email.resetValidation()
      this.$refs.program.resetValidation()
      this.$refs.password.resetValidation()
      this.$refs.password2.resetValidation()
      this.$refs.date.resetValidation()
      this.$refs.textarea.resetValidation()
    },

    filterCity(val, update) {
      update(() => {
        const needle = val.toLocaleLowerCase()
        this.cities = Cities.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
      })
    },

    setCity(val) {
      this.city = val
    },

    filterUniver(val, update) {
      update(() => {
        const needle = val.toLocaleLowerCase()
        this.universities = Universities.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
      })
    },

    setUniver(val) {
      this.university = val
    }
  }
}
</script>

<style scoped>
.q-pa-md {
  display: flex;
  align-items: center;
  margin-left: 30%;
}

.fullname, .date-city, .profile-photo, .pass, .study, .communication {
  display: flex;
  flex-wrap: wrap-reverse;
  flex-flow: wrap;
  width: 500px;
}

.name, .date, img, .pass1, .univer, .email {
  position: relative;
  left: 0;
  margin: 10px 10px 10px 0;
  flex-grow: 2;
  width: 240px;
}

.surname, .city, .program, .photo, .pass2, .social {
  right: 0;
  flex-grow: 2;
  margin: 10px 0 10px 10px;
  width: 240px;
}

</style>