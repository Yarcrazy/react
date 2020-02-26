import React from 'react';
import Table from "./Table/Table";
import THead from "./Table/THead";
import TBody from "./Table/TBody";
import Tr from "./Table/Tr";
import Td from "./Table/Td";
import Th from "./Table/Th";

export default function TestTable() {
  return (
    <Table>
      <THead className={'fixed'}>
        <Tr>
          <Th className={'col-fixed'}>1</Th>
          <Th>1</Th>
          <Th>2</Th>
          <Th className={'col-fixed'}>3</Th>
          <Th>3</Th>
          <Th>3</Th>
          <Th>3</Th>
          <Th>3</Th>
        </Tr>
      </THead>
      <TBody>
        <Tr>
          <Td className={'col-fixed'}>1</Td>
          <Td>1</Td>
          <Td>2</Td>
          <Td className={'col-fixed'}>3</Td>
          <Td>3</Td>
          <Td>3</Td>
          <Td>3</Td>
          <Td>3</Td>
        </Tr>
        <Tr>
          <Td className={'col-fixed'}>1</Td>
          <Td>1</Td>
          <Td>2</Td>
          <Td className={'col-fixed'}>3</Td>
          <Td>3</Td>
          <Td>3</Td>
          <Td>3</Td>
          <Td>3</Td>
        </Tr>
        <Tr>
          <Td className={'col-fixed'}>1</Td>
          <Td>1</Td>
          <Td>2</Td>
          <Td className={'col-fixed'}>3</Td>
          <Td>3</Td>
          <Td>3</Td>
          <Td>3</Td>
          <Td>3</Td>
        </Tr>
        <Tr>
          <Td className={'col-fixed'}>1</Td>
          <Td>1</Td>
          <Td>2</Td>
          <Td className={'col-fixed'}>3</Td>
          <Td>3</Td>
          <Td>3</Td>
          <Td>3</Td>
          <Td>3</Td>
        </Tr>
        <Tr>
          <Td className={'col-fixed'}>1</Td>
          <Td>1</Td>
          <Td>2</Td>
          <Td className={'col-fixed'}>3</Td>
          <Td>3</Td>
          <Td>3</Td>
          <Td>3</Td>
          <Td>3</Td>
        </Tr>
        <Tr>
          <Td className={'col-fixed'}>1</Td>
          <Td>1</Td>
          <Td>2</Td>
          <Td className={'col-fixed'}>3</Td>
          <Td>3</Td>
          <Td>3</Td>
          <Td>3</Td>
          <Td>3</Td>
        </Tr>
      </TBody>
    </Table>
  )
}
