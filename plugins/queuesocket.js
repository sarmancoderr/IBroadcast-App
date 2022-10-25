export default function queueSocket ({ store }, inject) {
  const socket = new WebSocket('wss://queue.ibroadcast.com/ws')

  socket.onopen = () => {
    const message = {
      ...store.getters['auth/baseReqParams'](),
      local_addr: '127.0.0.1',
      command: 'get_state'
    }
    socket.send(JSON.stringify(message))
  }

  socket.onmessage = (msg) => {
    console.log(msg)
    console.log(JSON.parse(msg.data))
  }

  socket.onclose = () => {
    setTimeout(() => {
      // open socket
    }, 5000)
  }
}
