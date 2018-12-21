<template>
  <b-container>
    <b-row>
      <b-col md="4">
        <h1>Регистрация</h1>

        <!-- EMAIL -->
        <b-row class="input-field">
          <b-col sm="3"><label for="form-email">Email</label></b-col>
          <b-col sm="9"><b-form-input type="email" :state="isEmailValid" id="form-email" v-model="email" @input.native="checkEmail" @blur.native="onblurEmail"/>
          </b-col>
        </b-row>

        <!-- FIO -->
        <b-row class="input-field">
          <b-col sm="3"><label for="form-fio">ФИО</label></b-col>
          <b-col sm="9">
            <b-form-input type="text" id="form-fio" @input.native="changeFio" v-model="fio" :disabled="isFioInputDisable" class="fio-input"/>
            <span class="fio-placeholder" @click="focusFio">{{ fioPlaceholder }}</span>
            <span class="fio-overflow-text" @click="focusFio">{{ fio }}</span>
          </b-col>
        </b-row>

        <!-- TEL -->
        <b-row class="input-field">
          <b-col sm="3"><label for="form-phone">Телефон</label></b-col>
          <b-col sm="9"><b-form-input type="tel" id="form-phone" v-model="phone" :disabled="isPhoneInputDisable" placeholder=""/>
          </b-col>
        </b-row>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
const FIO_PLACEHOLDER = ['Фамилия', 'Имя', 'Отчество']

export default {
  data () {
    return {
      fio: '',
      email: '',
      phone: '',
      fioPlaceholder: FIO_PLACEHOLDER.join(' '),

      isEmailValid: "null",

      isFioInputDisable: true,
      isPhoneInputDisable: true,

      errors: [],

      changeFio: function (e) {
        this.$nextTick(function () {
          let fioInputWords = this.fio.split(' ').filter(word => !!word)
          this.fioPlaceholder = this.fio.concat(` ${FIO_PLACEHOLDER.slice(fioInputWords.length).join(' ')}`)
        })
      },

      focusFio: function (e) {
        e.target.parentElement.firstChild.focus()
      },

      validEmail: function (email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },

      checkEmail: function () {
        if(this.validEmail(this.email)) {
          // console.log('api call')
        }
      },

      onblurEmail: function () {
        this.isEmailValid = this.email ? !!this.validEmail(this.email) : "null"
      },
    }
  }
}
</script>

<style>
  .input-field {
    position: relative;
    margin-bottom: 15px;
  }

  .fio-placeholder {
    z-index: 1;
    position: absolute;
    top: 8px;
    left: 28px;
    color: #ccc;
  }

  .fio-input {
    z-index: 3;
  }

  .fio-overflow-text {
    z-index: 1;
    position: absolute;
    top: 8px;
    left: 28px;
    color: black;
    background-color: white;
  }
</style>

