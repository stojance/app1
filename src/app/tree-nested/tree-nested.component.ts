import { Component, OnInit, Input } from '@angular/core';

const node = {
  name: 'root',
  children: [
    { name: 'a', children: [] },
    {
      name: 'b',
      children: [
        { name: 'b-1', children: [] },
        {
          name: 'b-2',
          children: [
            { name: 'b-2-1', children: [] },
            { name: 'b-2-2', children: [] },
            { name: 'b-2-3', children: [] },
          ],
        },
      ],
    },
    {
      name: 'c',
      children: [
        { name: 'c-1', children: [] },
        { name: 'c-2', children: [] },
      ],
    },
  ],
};

@Component({
  selector: 'app-tree-nested',
  templateUrl: './tree-nested.component.html',
  styleUrls: ['./tree-nested.component.scss'],
})
export class TreeNestedComponent implements OnInit {
  @Input() node: any;

  constructor() {
    this.node = node;
  }

  ngOnInit(): void {}
}
