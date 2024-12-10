export default {
  data () {
    return {
      userInfo: '',
      text: '',
      experience: {
        one: '',
        two: ''
      },
      fab: false,
      show: {
        about: false,
        profil: false,
        experience: false,
        projects: false
      },
      animated: {
        coffee0: false,
        coffee1: false,
        coffee2: false,
        coffee3: false
      },
      simple: [
        {
          label: 'Education',
          icon: 'cast_for_education',
          children: [
            {
              label: '2022 - 2024 | Financial Management',
              icon: 'school',
              children: [
                {
                  label: 'Siliwangi University',
                  header: 'generic',
                  icon: 'domain'
                },
                {
                  label: 'Tasikmalaya, West Java',
                  header: 'generic',
                  icon: 'pin_drop'
                }
              ]
            },
            {
              label: '2013 - 2017 | Physics Instrumentation and Electronics',
              icon: 'school',
              children: [
                {
                  label: 'Padjadjaran University',
                  icon: 'domain'
                },
                {
                  label: 'Bandung, West Java',
                  icon: 'pin_drop'
                }
              ]
            },
            {
              label: '2008 - 2013 | Junior - Senior High School',
              icon: 'school',
              children: [
                {
                  label: 'SMART Ekselensia Indonesia',
                  icon: 'domain'
                },
                {
                  label: 'Bogor, West Java',
                  icon: 'pin_drop'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  beforeMount () {
    this.getInitPage()
  },

  methods: {
    getInitPage () {
      this.userInfo = {
        username: 'Isnan',
        firstName: 'Isnan',
        secondName: 'Taufikkurrohman',
        email: 'isnantaufikkurohman@gmail.com',
        branch: 'Ciamis - Jawa Barat',
        role: 'Full Stack | Java | .Net Developer'
      }
      this.text = {
        about: 'I am a professional programmer  with over 7 years of experience in designing, developing, and optimizing high-performance applications. Proven ability in Java-based backend development, object-oriented programming, and troubleshooting complex software systems. Aiming to leverage my technical skills and expertise to deliver innovative and robust solutions in a forward-thinking development team.'
      }
      setTimeout(() => {
        this.show.about = true
        this.doShowCoffeAnimated()
        this.fab = true
        // this.show.profil = true
      }, 1000)
    },
    doAbout () {
      this.doReset()
      setTimeout(() => {
        this.show.about = true
      }, 500)
    },
    doProfile () {
      this.doReset()
      setTimeout(() => {
        this.show.profil = true
      }, 500)
    },
    doExperience () {
      this.doReset()
      setTimeout(() => {
        this.show.experience = true
      }, 500)
    },
    doProjects () {
      this.doReset()
      setTimeout(() => {
        this.show.projects = true
      }, 500)
    },
    doShowCoffeAnimated () {
      if (this.animated.coffee3 === true) {
        this.animated.coffee0 = true
        this.animated.coffee1 = false
        this.animated.coffee2 = false
        this.animated.coffee3 = false
      } else if (this.animated.coffee2 === true) {
        this.animated.coffee0 = false
        this.animated.coffee1 = false
        this.animated.coffee2 = false
        this.animated.coffee3 = true
      } else if (this.animated.coffee1 === true) {
        this.animated.coffee0 = false
        this.animated.coffee1 = false
        this.animated.coffee2 = true
        this.animated.coffee3 = false
      } else if (this.animated.coffee0 === true) {
        this.animated.coffee0 = false
        this.animated.coffee1 = true
        this.animated.coffee2 = false
        this.animated.coffee3 = false
      } else if (this.animated.coffee1 === false && this.animated.coffee2 === false && this.animated.coffee3 === false && this.animated.coffee0 === false) {
        this.animated.coffee0 = true
      }
      setTimeout(() => {
        this.doShowCoffeAnimated()
      }, 1500)
    },
    doReset () {
      this.show = {
        about: false,
        profil: false,
        experience: false,
        projects: false
      }
    }
  }
}
