interface Observer {
  update: (data: any) => void
}

interface Subject {
  subscribe: (observer: Observer) => void
  unsubscribe: (observer: Observer) => void
}

class Price implements Subject {
  observers: Observer[] = []

  constructor () {
    const element: HTMLInputElement = document.querySelector('#value')
    element.addEventListener('input', () => {
      this.notify(element.value)
    })
  }

  subscribe(observer:Observer) {
    this.observers.push(observer)
  }

  unsubscribe(observer: Observer) {
    const index = this.observers.findIndex(obs => obs === observer)

    this.observers.splice(index, 1)
  }

  notify(data: any): void {
    this.observers.forEach(observer => observer.update(data) )
  }
}

class Display implements Observer {
  private element: HTMLElement

  constructor () {
    this.element = document.querySelector('#price')
  }

  update(data: any) {
    this.element.innerText = data
  }
}

const value = new Price()
const display = new Display()

value.subscribe(display)

setTimeout(() => {
  value.unsubscribe(display)
}, 5000)