import React from 'react';
import Table from "./Table";

export default function TestTable() {
  return (
    <Table className={'table'}>
      <thead>
      <tr className={'row-fixed'}>
        <th>ш1</th>
        <th className={'col-fixed'}>ш2</th>
        <th>ш3</th>
        <th>ш4</th>
        <th>ш5</th>
        <th>ш6</th>
        <th>ш7</th>
        <th>ш8</th>
        <th>ш9</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>1</td>
        <td className={'col-fixed'}>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
      </tr>
      <tr>
        <td>1</td>
        <td className={'col-fixed'}>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
      </tr>
      <tr>
        <td>1</td>
        <td className={'col-fixed'}>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
      </tr>
      </tbody>
    </Table>
  )
}
