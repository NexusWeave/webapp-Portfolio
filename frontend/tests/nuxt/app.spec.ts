import App from '../../app.vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

describe('Nuxt application', () => {
  it('mounts the app component', () => {
    // A simple sanity test to ensure testing environment is set up.
    expect(App).toBeTruthy()
  })
})
