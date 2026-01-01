import { Box } from '@chakra-ui/react';

function TextEditorViewer({ content }: { content: string }) {
  return (
    <Box
      className="ql-editor"
      lineHeight={1.8}
      css={{
        // 하위 h1 태그 선택
        '& h1': {
          fontSize: '3xl', // Chakra v3의 디자인 토큰 사용 가능
          fontWeight: 'bold',
        },
        '& h2': {
          fontSize: '2xl',
          fontWeight: 'bold',
        },
        // '& p': {
        //   mb: '4',
        // },
        '& strong': {
          fontWeight: 'bold',
        },
        '& ul': {
          listStyleType: 'disc',
          ps: '5',
          my: '4',
        },
      }}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    ></Box>
  );
}

export default TextEditorViewer;
