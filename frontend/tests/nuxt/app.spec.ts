import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../../app.vue'

describe('Nuxt application', () => {
  it('mounts the app component', () => {
    // A simple sanity test to ensure testing environment is set up.
    expect(App).toBeTruthy()
  })
})
