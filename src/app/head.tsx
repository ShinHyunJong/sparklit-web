export default function Head() {
  return (
    <>
      {/* <meta
        name="naver-site-verification"
        content="22aaf14eb4306bc1a85ec5431e849740e3f7fb54"
      /> */}
      <meta
        name="viewport"
        content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
      />
      {/* <Script
        id="hotjar-init"
        strategy="afterInteractive" // Hydration 직후 실행. 더 빨리 필요하면 'beforeInteractive'
        dangerouslySetInnerHTML={{
          __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:6380259,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
        }}
      /> */}
    </>
  );
}
