import React from 'react';
import Table from "./Table/Table";
import THead from "./Table/THead";
import TBody from "./Table/TBody";
import Tr from "./Table/Tr";
import Td from "./Table/Td";

export default function TestTable() {
  return (
    <Table>
      <THead className={'fixed'}>
        <Tr>
          <Td className={'col-fixed'}>1</Td>
          <Td>2</Td>
          <Td>3</Td>
        </Tr>
      </THead>
      <TBody>
        <Tr>
          <Td className={'col-fixed'}>1</Td>
          <Td>2</Td>
          <Td>3</Td>
        </Tr>
        <Tr>
          <Td className={'col-fixed'}>1</Td>
          <Td>2</Td>
          <Td>3</Td>
        </Tr>
        <Tr>
          <Td className={'col-fixed'}>1</Td>
          <Td>2</Td>
          <Td>3</Td>
        </Tr>
      </TBody>
    </Table>
  )
}
