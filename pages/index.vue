<template>
  <b-container>
    <b-row>
      <b-col md="4">
        <h1>Регистрация</h1>

        <!-- EMAIL -->
        <b-row class="input-field">
          <b-col sm="3"><label for="form-email">Email</label></b-col>
          <b-col sm="9"><b-form-input type="email" id="form-email" v-model="email" placeholder=""/>
          </b-col>
        </b-row>

        <!-- FIO -->
        <b-row class="input-field">
          <b-col sm="3"><label for="form-fio">ФИО</label></b-col>
          <b-col sm="9">
            <b-form-input type="text" id="form-fio" @input.native="changeFio" v-model="fio" class="fio-input"/>
            <span class="fio-placeholder" @click="focusFio">{{ fioPlaceholder }}</span>
            <span class="fio-overflow-text" @click="focusFio">{{ fio }}</span>
          </b-col>
        </b-row>

        <!-- TEL -->
        <b-row class="input-field">
          <b-col sm="3"><label for="form-phone">Телефон</label></b-col>
          <b-col sm="9"><b-form-input type="tel" id="form-phone" v-model="phone" placeholder=""/>
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
      changeFio: function (e) {
        this.$nextTick(function () {
          let fioInputWords = this.fio.split(' ').filter(word => !!word)
          this.fioPlaceholder = this.fio.concat(` ${FIO_PLACEHOLDER.slice(fioInputWords.length).join(' ')}`)
        })
      },

      focusFio: function (e) {
        console.log('focus', e.target.parentElement.firstChild.focus())
      }
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

