if (process.env.NODE_ENV === 'production') {
  const OfflinePluginRuntime = require('offline-plugin/runtime')

  const log = (msg) => {
    console.log('[SW] ', msg) // eslint-disable-line no-console
  }

  window.onNuxtReady(() => {
    log('Installing')

    OfflinePluginRuntime.install({
      onInstalled: () => {
        log('Installed')
      },
      onUpdating: () => {
        log('Updating')
      },
      onUpdateReady: () => {
        log('Update Ready')

        // Tells to new SW to take control immediately
        OfflinePluginRuntime.applyUpdate()
      },
      onUpdated: () => {
        log('Updated')

        // Reload the web page to load into the new version
        window.location.reload()
      },
      onUpdateFailed: () => {
        log('Update Failed')
      }
    })
  })
}
