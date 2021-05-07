import React, { Component } from 'react';
import { Table } from '@jpmorganchase/perspective';
import { ServerRespond } from './DataStreamer';
import './Graph.css';

/**
 * Props declaration for <Graph />
 */
interface IProps {
  data: ServerRespond[],
}

/**
 * Perspective library adds load to HTMLElement prototype.
 * This interface acts as a wrapper for Typescript compiler.
 * Extend this inteface using HTMLElement class
 */
interface PerspectiveViewerElement extends HTMLElement {
  load: (table: Table) => void,
}

/**
 * React component that renders Perspective based on data
 * parsed from its parent through data property.
 */
class Graph extends Component<IProps, {}> {
  // Perspective table
  table: Table | undefined;

  render() {
    return React.createElement('perspective-viewer');
  }

  componentDidMount() {
    // Get element to attach the table from the DOM.
    const elem = document.getElementsByTagName('perspective-viewer')[0] as unknown as PerspectiveViewerElement;

    const schema = {
      stock: 'string',
      top_ask_price: 'float',
      top_bid_price: 'float',
      timestamp: 'date',
    };

    if (window.perspective && window.perspective.worker()) {
      this.table = window.perspective.worker().table(schema);
    }
    if (this.table) {
      // Load the `table` in the `<perspective-viewer>` DOM reference.

        // Add more Perspective configurations here.
        elem.setAttribute('view', 'y_line');   // Visualize the data as continuous line graph.
        elem.setAttribute('column-pivots', '["stock"]');  // Stock is used to distinguish between two stocks i.e. ABC & DEF.
        elem.setAttribute('row-pivots', '["timestamp"]');  // Timestamp will be plotted on x-axis to map the related stocks.
        elem.setAttribute('columns', '["top_ask_price"]');  // Allow us to only focus on a particular part of a stock’s data along the y-axis.
        elem.setAttribute('aggregates',
            `{
                "stock": "distinct_count",
                "top_ask_price": "avg",
                "top_bid_price": "avg",
                "timestamp": "distinct_count",
            }`);  // To handle duplicated data and treat each point to be unique.
      elem.load(this.table);
    }
  }

  componentDidUpdate() {
    // Everytime the data props is updated, insert the data into Perspective table
    if (this.table) {
      // As part of the task, you need to fix the way we update the data props to
      // avoid inserting duplicated entries into Perspective table again.
      this.table.update(this.props.data.map((el: any) => {
        // Format the data from ServerRespond to the schema
        return {
          stock: el.stock,
          top_ask_price: el.top_ask && el.top_ask.price || 0,
          top_bid_price: el.top_bid && el.top_bid.price || 0,
          timestamp: el.timestamp,
        };
      }));
    }
  }
}

export default Graph;
