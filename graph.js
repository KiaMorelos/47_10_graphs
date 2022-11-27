// based on lecture notes / demo videos / solution
// i was able to write most of it without help from the above, though
// i needed help in particular for the dfs, bfs section
class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let node of vertexArray) {
      this.addVertex(node);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const stack = [start]; // The stack starts with start
    const result = [];
    const visited = new Set(); // set helps keeps duplicates out
    let currentVertex;

    // visit node
    visited.add(start);

    // while there are still items in the stack do the following
    while (stack.length) {
      currentVertex = stack.pop(); // take last in off the end, set the current vertex to be whats at the top of the stack
      result.push(currentVertex.value); // push the value to results arrway

      // check if there are neighbors/adjacents for the current vertex
      currentVertex.adjacent.forEach((neighbor) => {
        // for every neighbor, if it's not in the visted set, add it to the visted set, push it into the stack
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push(neighbor);
        }
      });
    }
    return result; // return the result
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let queue = [start]; // start is first in line for the queue
    let visited = new Set(queue); // use set so there are no dupe visits
    let result = []; // save items in here

    // while items are left in line
    while (queue.length > 0) {
      let currentValue = queue.shift(); // current value is the first item in line, item in front
      result.push(currentValue.value); // push this to results

      for (let adj of currentValue.adjacent) {
        // for every adjacent of the item we're checking
        // if it has not already been visited, queue it up and add it to visted
        if (!visited.has(adj)) {
          queue.push(adj);
          visited.add(adj);
        }
      }
    }

    return result; // return the result when done!;
  }
}

module.exports = { Graph, Node };
