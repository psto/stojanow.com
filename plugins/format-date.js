import Vue from 'vue'

Vue.filter('formatDate', (dateStr) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateStr).toLocaleDateString('en', options)
})
