<template>
  <div>
    <b-col md="4">
      <h1 v-text="regTitle" v-show="isNewEmail"/>
      <h1 v-text="signInTitle" v-show="!isNewEmail"/>

      <!-- EMAIL -->
      <b-row class="input-field">
        <b-col sm="3"><label for="form-email" v-text="emailLabelText"/></b-col>
        <b-col sm="9"><b-form-input type="email"
                                    size="sm"
                                    :state="isEmailValid"
                                    id="form-email"
                                    v-model="email"
                                    @input.native="checkEmail"
                                    @blur.native="onblurEmail"/>
        </b-col>
      </b-row>

      <!-- FIO -->
      <b-row class="input-field" v-show="isNewEmail">
        <b-col sm="3"><label for="form-fio" v-text="fioLabelText"/></b-col>
        <b-col sm="9">
          <b-form-input type="text"
                        id="form-fio"
                        size="sm"
                        @input.native="changeFio"
                        v-model="fio"
                        :state="isFioValid"
                        :disabled="isFioInputDisable"
                        class="fio-input"
          />
          <span class="fio-placeholder" @click="focusFio" v-text="fioPlaceholder"></span>
          <span class="fio-overflow-text" @click="focusFio" v-text="fio"></span>
        </b-col>
      </b-row>

      <!-- PHONE -->
      <b-row class="input-field" v-show="isNewEmail">
        <b-col sm="3"><label for="form-phone" v-text="phoneLabelText"/></b-col>
        <b-col sm="9">
          <b-form-input type="tel"
                        id="form-phone"
                        size="sm"
                        v-model="phone"
                        @blur.native="onBlurPhone"
                        :disabled="isPhoneInputDisable"
                        :state="isPhoneValid"
                        placeholder="+7 XXXXXXXXXX"
          />
        </b-col>
      </b-row>

      <!-- PASSWORD -->
      <b-row class="input-field" v-show="!isNewEmail">
        <b-col sm="3"><label for="form-password" v-text="passwordLabelText"/></b-col>
        <b-col sm="9"><b-form-input type="password" size="sm" id="form-password" v-model="password"/>
        </b-col>
      </b-row>

      <b-button variant="success"
                v-show="isNewEmail"
                v-text="regBtnText"
                :disabled="isRegistrationDisabled"
                v-on:click="doRegister"/>

      <b-button variant="success"
                v-show="!isNewEmail"
                v-text="signInBtnText"
                :disabled="true"/>


      <code v-show="requestData">
        <br>
        Request data:
        <br>
        {{requestData}}
      </code>

    </b-col>
  </div>
</template>

<script>
  const FIO_PLACEHOLDER = ['Фамилия', 'Имя', 'Отчество']
  const FAKE_REGISTERED_EMAILS = ['fake@test.ru', 'fake2@test.ru']

  const debounce = (fn, bufferInterval) => {
    let timeout;

    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(fn.apply.bind(fn, this, arguments), bufferInterval);
    };
  }

  export default {
    methods: {
      async fakeRegistration (fio, email, phone) {

        if(this.isValidEmail(email) && this.isValidPhone(phone) && this.isValidFio(fio)) {
          const requestData = {
            EMAIL: email,
            LAST_NAME: fio.split(' ')[0],
            NAME: fio.split(' ')[1],
            SECOND_NAME: fio.split(' ')[2],
            PERSONAL_PHONE: this.getValidPhone(phone),
          }

          const response = await new Promise(resolve => {
            setTimeout(function (that) {

              that.requestData = JSON.stringify(requestData)
              console.log('send registration request', requestData)

              resolve('OK')
            }, 500, this)
          })

          if(response === 'OK') {
            // this.$router.push({
            //   path: '/congratulation'
            // })
          }
        }
      },
      async fakeFetchEmail (email) {
        const response = await new Promise(function (resolve) {
          setTimeout(function () {
            FAKE_REGISTERED_EMAILS.map(item => {
              if(item === email) {
                resolve({STATUS:'OK'})
              }
              return item
            })
            resolve()
          }, 300)
        })

        console.log(response)

        if(response && response.STATUS === 'OK') {
          this.isNewEmail = false
        } else {
          this.isFioInputDisable = false
          this.isPhoneInputDisable = false
          this.isNewEmail = true
        }
      },

      doRegister: function () {
        if(!this.isValidEmail(this.email)) {
          this.isEmailValid = false
          return
        }

        if(!this.isValidFio(this.fio)) {
          this.isFioValid = false
          return
        } else {
          this.isFioValid = 'null'
        }

        if(!this.isValidPhone(this.phone)) {
          this.isPhoneValid = false
          return
        }

        this.fakeRegistration(this.fio, this.email, this.phone)
      }
    },
    data () {
      return {
        fio: '',
        fioPlaceholder: FIO_PLACEHOLDER.join(' '),
        isFioInputDisable: true,
        isFioValid: 'null',

        email: '',
        isEmailValid: 'null',
        isNewEmail: true,

        phone: '',
        isPhoneValid: 'null',
        isPhoneInputDisable: true,

        password: '',

        isRegistrationDisabled: false,

        requestData: '',

        regTitle: 'Регистрация',
        signInTitle: 'Вход',
        regBtnText: 'Зарегистрироваться',
        signInBtnText: 'Войти',
        emailLabelText: 'Email',
        fioLabelText: 'ФИО',
        phoneLabelText: 'Телефон',
        passwordLabelText: 'Пароль',

        // FIO
        changeFio: function (e) {
          this.$nextTick(function () {
            let fioInputWords = this.fio.split(' ').filter(word => !!word)
            this.fioPlaceholder = this.fio.concat(` ${FIO_PLACEHOLDER.slice(fioInputWords.length).join(' ')}`)
          })
        },

        focusFio: function (e) {
          e.target.parentElement.firstChild.focus()
        },

        isValidFio: function (fio) {
          if(typeof fio === 'string') {
            this.isFioValid = fio.split(' ').length === FIO_PLACEHOLDER.length ? 'null' : false
            return this.isFioValid
          } else {
            return false
          }
        },

        // EMAIL
        isValidEmail: function (email) {
          const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
        },

        checkEmail: function () {
          if(this.email && this.isValidEmail(this.email)) {
            debounce(this.fakeFetchEmail(this.email), 300)
          }
        },

        onblurEmail: function () {
          this.isEmailValid = this.email ? !!this.isValidEmail(this.email) : 'null'
        },

        // PHONE
        getValidPhone: function (phone) {
          return phone.replace( /[ )(-+]/g, '')
        },

        isValidPhone: function (phone) {
          return this.getValidPhone(phone).length > 9 || null
        },

        onBlurPhone: function () {
          this.isPhoneValid = this.phone ? this.isValidPhone(this.phone) : 'null'
        },

        isReadyToRegister () {
          this.isRegistrationDisabled = this.isValidFio(this.fio) && this.isValidEmail(this.email) && this.isValidPhone(this.phone)
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
    top: 5px;
    left: 24px;
    color: #6d7880;
    font-size: 0.875rem;
  }

  .fio-input {
    z-index: 3;
  }

  .fio-overflow-text {
    z-index: 1;
    position: absolute;
    top: 5px;
    left: 24px;
    color: black;
    background-color: white;
    font-size: 0.875rem;
  }
</style>

