import { v4 as uuidV4 } from 'uuid'

class Node {
    constructor(message) {
        this.message = message
        this.uuid = uuidV4()
        this.next = null
        this.read = false
    }
}

function formResponseData(isSuccess, message) {
    return {
        success: isSuccess,
        message
    }
}

class Queue {

    // private fields

    #head = null
    #tail = null
    #count = 0
    #maxCount = 1000

    constructor() {}

    #isEmpty() {
        return this.#head ? false : true
    }

    getMessageCount() {
        return this.#count
    }

    write(message) {
        const node = new Node(message)

        if (this.#isEmpty()) {
            this.#tail = node
            this.#head = node
            this.#count += 1
            return formResponseData(true, 'success')
        }

        if (this.#count === this.#maxCount) {
            return formResponseData(false, `Queue reached max limit ${this.#maxCount}`)
        }

        this.#tail.next = node
        this.#tail = node
        this.#count += 1
        return formResponseData(true, 'success')
    }

    read() {
        if (this.#isEmpty()) {
            return null // Queue is empty
        }

        let current = this.#head
        while (current) {
            if (!current.read) {
                current.read = true
                const data = {
                    message: current.message,
                    uuid: current.uuid
                }
                return data
            }
            current = current.next
        }

        return null // No unread messages
    }

    delete(uuid) {
        if (this.#isEmpty()) {
            return formResponseData(false, 'Queue is empty. No items to delete.')
        }

        if (this.#head.uuid === uuid) {
            this.#head = this.#head.next
            if (this.#head === null) this.#tail = null
            this.#count -= 1
            return formResponseData(true, 'success')
        }

        let current = this.#head

        while (current.next) {
            if (current.next.uuid === uuid) {
                if (this.#tail === current.next) this.#tail = current
                current.next = current.next.next
                this.#count -= 1
                return formResponseData(true, 'success')
            }
            current = current.next
        }

        return formResponseData(false, `No item found with the uuid ${uuid} to delete`)
    }
}

const queue = new Queue()
Object.freeze(queue) // The queue instance cannot be modified now in the importing place

export default queue