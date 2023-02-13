<template>
  <!--<div class="auth">Auth</div>-->
  <div class="q-pa-md" style="max-width: 300px">
    <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
      <div class="fullname">
        <q-input class="name" ref="name" clearable filled
                 v-model="name"
                 hint="Name"
                 label="Name *"
                 lazy-rules
                 :rules="[ val => val && val.length > 1 && val.length < 51 && new RegExp(/^[a-zA-Z]+(?:[' -][a-zA-Z]+)*$/).test(val) || 'Name should have length from 2 to 50 characters']"
        />

        <q-input class="surname" ref="surname" clearable filled
                 v-model="surname"
                 label="Surname *"
                 hint="Surname"
                 lazy-rules
                 :rules="[ val => val && val.length > 1 && val.length < 51 && new RegExp(/^[a-zA-Z]+(?:[' -][a-zA-Z]+)*$/).test(val) || 'Surname should have length from 2 to 50 characters']"
        />
      </div>

      <q-input ref="date" v-model="date" filled type="date" hint="Date of birth *" clearable
               lazy-rules
               :rules="[ val => val && val.length > 0 || 'Please enter your date of birth']"/>

      <!--      <q-input ref="city" clearable filled-->
      <!--               v-model="city"-->
<!--                     hint="City where you study"-->
      <!--               label="City *"-->
      <!--               mask="S"-->
      <!--               lazy-rules-->
      <!--               :rules="[ val => !!val && val.length > 1 || 'Please enter your city']"-->
      <!--      />-->

      <div class="study">
        <q-select ref="city" class="city" filled :value="city" use-input hide-selected fill-input
                  input-debounce="0"
                  :options="cities"
                  @filter="filterCity"
                  @input-value="setCity"
                  hint="City where you study"
                  label="City *"
                  lazy-rules
                  :rules="[ val => val && val.length > 1 && val.length < 51 && new RegExp(/^[A-Za-z]+(?:[\s-][A-Za-z]+)*$/).test(val) || 'City should have length from 2 to 50 characters']"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>

<!--      <q-input ref="university" clearable filled-->
<!--               v-model="university"-->
<!--               hint="University where you study"-->
<!--               label="University *"-->
<!--               mask="S"-->
<!--               lazy-rules-->
<!--               :rules="[ val => !!val && val.length > 1 || 'Please enter your university']"-->
<!--      />-->

      <q-select ref="university" class="univer" filled :value="university" use-input hide-selected fill-input
                input-debounce="0"
                :options="universities"
                @filter="filterUniver"
                @input-value="setUniver"
                label="University *"
                hint="University where you study"
                lazy-rules
                :rules="[ val => val && val.length > 1 && val.length < 101 && new RegExp(/^[A-Za-z0-9\s.,'-]*$/).test(val) || 'Please enter your university']"
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

      <q-input ref="email" label="Email *" filled clearable
               v-model="email"
               type="email"
               hint="Email"
               lazy-rules
               :rules="[ val => val && val.length > 0 && val.length < 101 && new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(val) || 'Please enter your email']"
      />

      <q-input ref="password" v-model="password" label="Password *"
               filled clearable
               :type="isPwd ? 'password' : 'text'"
               hint="Use a combination of letters, numbers, and symbols - a total of at least 8 characters"
               lazy-rules
               :rules="[ val => val && val.length > 7 && val.length < 17 && new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+.'])\S{8,}$/).test(val) || 'Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character from the set !@#$%^&*()_+.']">
        <template v-slot:append>
          <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <q-toggle v-model="accept" label="I accept the license and terms"/>

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
      </div>
      <q-btn color="red" icon="img:../assets/google-plus.png" label="Google"/>
    </form>
  </div>


</template>

<script>
const Cities = [
  'Prague', 'Brno', 'Pardubice', 'Olomouc', 'Pilsen', 'Liberec', 'Ostrava']

const Universities = [
     'Czech Technical University (CTU)', 'Masaryk University', 'Charles University', 'Czech University of Life Sciences', 'Palacký University', 'Brno University of Technology (BUT)', 'University of South Bohemia',  'University of Ostrava',
    'Technical University of Liberec', 'University of West Bohemia', 'University of Pardubice', 'Prague University of Economics and Business'
]

export default {
  name: "Auth",
  data() {
    return {
      name: null,
      surname: null,
      email: null,
      password: null,
      date: null,
      isPwd: true,
      hasError: false,
      formHasError: false,

      accept: false,

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
      this.$refs.email.validate()
      this.$refs.password.validate()
      this.$refs.date.validate()
      this.$refs.university.validate()
      this.$refs.city.validate()

      if (this.$refs.name.hasError || this.$refs.password.hasError || this.$refs.email.hasError || this.$refs.date.hasError || this.$refs.city.hasError || this.$refs.university.hasError) {
        this.formHasError = true
        this.$q.notify({
          color: 'negative',
          message: 'Please check and fill the form correctly',
          position : 'bottom-right'
        })
      } else if (this.accept !== true) {
        this.$q.notify({
          color: 'negative',
          message: 'You need to accept the license and terms first',
          position : 'bottom-right'
        })
      } else {
        this.$q.notify({
          icon: 'done',
          color: 'positive',
          message: 'Submitted',
          position : 'bottom-right'
        })
      }
    },

    onReset() {
      this.name = null
      this.surname = null
      this.city = null
      this.university = null
      this.password = null
      this.email = null
      this.date = null

      this.$refs.name.resetValidation()
      this.$refs.surname.resetValidation()
      this.$refs.email.resetValidation()
      this.$refs.password.resetValidation()
      this.$refs.date.resetValidation()
      this.$refs.city.resetValidation()
      this.$refs.university.resetValidation()
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

.fullname, .study {
  position: center;
  display: flex;
  flex-wrap: wrap-reverse;
  flex-flow: wrap;
  width: 500px;
}

.name, .city{
  position: relative;
  left: 0;
  margin: 10px 10px 10px 0;
  flex-grow: 2;
  width: 240px;
}

.surname, .univer{
  position: relative;
  right: 0;
  flex-grow: 2;
  margin: 10px 0 10px 10px;
  width: 240px;
}
</style>
