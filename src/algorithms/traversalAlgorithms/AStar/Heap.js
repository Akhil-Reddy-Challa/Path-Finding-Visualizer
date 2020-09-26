export default class Heap {
  constructor() {
    /* Initialing the array heap and adding a dummy element at index 0 */
    this.heap = [null];
    this.length = 0; //Stores the number of elements
  }

  getMin() {
    /* Accessing the min element at index 1 in the heap array */
    return this.heap[1].f;
  }
  insert(node) {
    /* Inserting the new node at the end of the heap array */
    this.heap.push(node);
    this.length++;
    /* Finding the correct position for the new node */

    if (this.heap.length > 1) {
      let current = this.heap.length - 1;

      /* Traversing up the parent node until the current node (current) is greater than the parent (current/2)*/
      while (
        current > 1 &&
        this.heap[Math.floor(current / 2)].f > this.heap[current].f
      ) {
        /* Swapping the two nodes by using the ES6 destructuring syntax*/
        this.swap(Math.floor(current / 2), current);
        current = Math.floor(current / 2);
      }
    }
  }
  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }
  remove() {
    this.length--;
    /* Smallest element is at the index 1 in the heap array */
    let smallest = this.heap[1];

    /* When there are more than two elements in the array, we put the right most element at the first position
          and start comparing nodes with the child nodes
      */
    if (this.heap.length > 2) {
      this.heap[1] = this.heap[this.heap.length - 1];
      this.heap.splice(this.heap.length - 1); //Pop's the last element

      if (this.heap.length === 3) {
        if (this.heap[1].f > this.heap[2].f) {
          this.swap(1, 2);
        }
        return smallest;
      }

      let current = 1;
      let leftChildIndex = current * 2;
      let rightChildIndex = current * 2 + 1;

      while (
        this.heap[leftChildIndex] &&
        this.heap[rightChildIndex] &&
        (this.heap[current].f > this.heap[leftChildIndex].f ||
          this.heap[current].f > this.heap[rightChildIndex].f)
      ) {
        if (this.heap[leftChildIndex].f < this.heap[rightChildIndex].f) {
          this.swap(current, leftChildIndex);
          current = leftChildIndex;
        } else {
          this.swap(current, rightChildIndex);
          current = rightChildIndex;
        }

        leftChildIndex = current * 2;
        rightChildIndex = current * 2 + 1;
      }
    } else if (this.heap.length === 2) {
      /* If there are only two elements in the array, we directly splice out the first element */
      this.heap.splice(1, 1);
    } else {
      return null;
    }

    return smallest;
  }
  allTheElements() {
    // console.log(
    //   "I am in all the elements & the length of heap is: ",
    //   this.length
    // );
    // console.log("leng is", this.length);
    if (this.length > 0) {
      return this.heap.slice(1);
    } else return [];
  }
  print() {
    if (this.length === 0) return "[]";
    console.log("Original list: ", this.heap);
    var elements = "[";
    for (let i = 1; i <= this.length; i++) {
      var temp = this.heap[i].position.slice();
      temp = "(" + temp.toString() + ")";
      elements += temp;
      elements += ",";
    }
    elements += "]";
    return elements;
  }
}
