import { reactive, ref } from 'vue'
import VueJwtDecode from 'vue-jwt-decode'

export const storeAuthentification = reactive({
  estConnecte: false,
  JWT: '',
  id: -1,
  premium: false,
  roles: [],
  connexion(login: string, motDePasse: string, succes: () => void, echec: () => void): void {
    const connectingUser = ref({
      login: login,
      password: motDePasse
    })
    fetch('http://api.iut.romainmillan.fr/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(connectingUser.value)
    }).then((response) => {
      response.json().then((data) => {
        if (response.status === 201 || response.status === 200) {
          this.JWT = data.token
          this.estConnecte = true
          this.premium = VueJwtDecode.decode(this.JWT).premium
          this.id = VueJwtDecode.decode(this.JWT).id
          this.roles = VueJwtDecode.decode(this.JWT).roles
          succes()
        } else {
          echec()
        }
      })
    })
  },
  deconnexion(): void {
    ;(this.JWT = ''), (this.estConnecte = false)
  }
})
