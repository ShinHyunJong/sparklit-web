import { Box } from '@chakra-ui/react';
import parse from 'html-react-parser';
import React from 'react';
import { Slide } from 'react-awesome-reveal';

function TextEditorViewer({ content }: { content: string }) {
  const parsedContent = parse(content);

  // 1. 파싱된 결과가 단일 요소일 경우 배열로 정규화
  const reactElements = React.Children.toArray(parsedContent);

  // 2. 배열을 3개씩 묶는(Chunking) 로직
  const chunkedElements = [];
  for (let i = 0; i < reactElements.length; i += 3) {
    chunkedElements.push(reactElements.slice(i, i + 3));
  }

  return (
    <Box
      className="ql-editor"
      lineHeight={1.8}
      css={{
        '& h1': {
          fontSize: '3xl',
          fontWeight: 'bold',
        },
        '& h2': {
          fontSize: '2xl',
          fontWeight: 'bold',
        },
        '& strong': {
          fontWeight: 'bold',
        },
        '& ul': {
          listStyleType: 'disc',
          ps: '5',
          my: '4',
        },
      }}
    >
      {chunkedElements.map((group, index) => (
        <Slide
          key={`slide-group-${index}`}
          triggerOnce
          direction="up"
          duration={500}
          cascade
          damping={0.3} // 그룹 내 3개 요소 사이의 시차
        >
          {/* 3개씩 묶인 요소들을 렌더링 */}
          {group}
        </Slide>
      ))}
    </Box>
  );
}

export default TextEditorViewer;
