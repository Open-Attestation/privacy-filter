import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import JSONTree from 'react-json-tree';

function valueRenderer(raw) {
  return (
    <span>
      {raw} <Button variant="danger" size="sm">Redact</Button>
    </span>
  )
}

function redactValue(path) {
  return true
}

export const DocumentTreeView = () => {
  const json = {
    "schema": "opencerts/v2.0",
    "data": {
      "id": "e160ddc1-3e9f-496a-8e96-d3c0873c7561:string:41368",
      "description": "d24c312f-86b0-4446-a03d-38fb9957aefc:string:The course teaches participants how to utilise risk-based tools to establish a robust data protection infrastructure for their organisation.  They will review and take stock of the personal data their organisation handles, assessing the risks involved, and developing data protection policies, processes and data governance structures for their organisation. Participants will be able to:\n• Understand the importance of being accountable for the personal data their organisation handles\n• Develop a Data Protection Management Programme\n• Conduct a Data Protection Impact Assessment\n• Develop a Personal Data Inventory\n• Understand the stages of personal data handling and the factors and risks they need to consider when developing their organisation’s personal data policies and processes.",
      "name": "b5fae7b2-ca9a-4ebc-a732-63f1c208263e:string:Practitioner Certificate in Personal Data Protection (Singapore)",
      "recipient": {
        "name": "93c37dd3-8416-49f8-81b7-1716d3aefa5f:string:Goi Jia Jian"
      },
      "issuedOn": "42286912-67d2-4185-a481-2c7821131283:string:2020-04-14T08:00:00+08:00",
      "issuers": [
        {
          "name": "90757fa9-c143-45bb-9769-bc1f266058c4:string:SMU Academy",
          "documentStore": "48030765-2463-4d83-878d-79db52b0d877:string:0x6c806e3E0Ea393eC7E8b7E7fa62eF92Fcd039404",
          "network": "49d75ef9-d606-4923-9492-9cf4da012a64:string:ETHEREUM",
          "identityProof": {
            "type": "0bd3fb8f-c065-4808-b128-29cc13fb1cc1:string:DNS-TXT",
            "location": "71b2f120-a613-44aa-8cf0-13ae660cdb0b:string:certstore.smu.edu.sg"
          }
        }
      ],
      "additionalData": {
        "certSignatories": [
          {
            "name": "b2d4a5fc-7e0a-43ad-a224-97c21c3adb85:string:Dr Lim Lai Cheng",
            "designation": "5226c4c8-df28-4eed-8d9f-0cf41b09dbdb:string:Executive Director",
            "email": "885eb79f-c44d-4403-9e1e-3235f30e3c07:string:lclim@smu.edu.sg"
          }
        ],
        "extra": {
          "dateFrom": "1abebdf3-0fc5-4732-b148-7796d7c22828:string:2020-04-06T08:00:00+08:00",
          "dateTo": "9cafd9e6-62ab-4608-83a7-a3a4d2f6d88b:string:2020-04-07T08:00:00+08:00",
          "idType": "f4484005-7440-4e50-8b4a-1a44f6976a2f:string:SP"
        }
      },
      "$template": {
        "name": "10af685b-06c1-49dd-92bb-af3a52fcf705:string:SMU-A-TIS-2019-4",
        "type": "f81508ff-2f40-4bf5-a6ec-7b907d1a9898:string:EMBEDDED_RENDERER",
        "url": "fe4ef2ba-e773-4ba4-ba14-c9e88bc35abe:string:https://academy.smu.edu.sg/verify"
      }
    },
    "privacy": {
      "obfuscatedData": [
        "a162a4c136ec4a02cb3dd20ec281f55a0507ecf9b3f229a122a340e6786473ac",
        "4c0ee8a39e52fd2c384bef1213b6784fcfac6a40ef9a3694d33ac315defa5d0f"
      ]
    },
    "signature": {
      "type": "SHA3MerkleProof",
      "targetHash": "64f7b1322fdb86be136a23eb65b93351bdf5128a0e5afb64019e179cb66f078b",
      "proof": [
        "f5dab77712afd47a8b87b4b3bc685c1c6827843e38357697e52c01593ed7fb22",
        "516794e14a69074a1437ddb972a063d04b4733ad6076fdd335f2d5bdab52ec05",
        "74f086ebff10a10158233dbbdc207d4514f7bd8df9cbcadf4a384c1cf0de96f7",
        "eddfd98891328db274321edc5985d839772e3bc1e481d8f7d6fa972cad7ed68f"
      ],
      "merkleRoot": "6b5bb39220415b92c321cb981fccf6e8cdc16287d8eb2e56a2ad33f757ccfae2"
    }
  }

  const theme = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633'
  };

  return (
    <Card>
      <Card.Header>OpenCerts Viewer</Card.Header>
      <Card.Body>
        <Card.Text>
          <JSONTree
            data={json}
            theme={theme}
            invertTheme={true}
            valueRenderer={(raw) => valueRenderer(raw)} />
        </Card.Text>
      </Card.Body>
    </Card>
  )
}