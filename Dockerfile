FROM node:19-alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

RUN mkdir -p /app/public/tfjs_target_dir

# This is the eLife (only) model.
#RUN wget -O /app/public/tfjs_target_dir/model.json https://osf.io/download/te3p8
#RUN wget -O /app/public/tfjs_target_dir/group1-shard1of23.bin https://osf.io/download/emgkb
#RUN wget -O /app/public/tfjs_target_dir/group1-shard2of23.bin https://osf.io/download/evcu7
#RUN wget -O /app/public/tfjs_target_dir/group1-shard3of23.bin https://osf.io/download/f6gdu
#RUN wget -O /app/public/tfjs_target_dir/group1-shard4of23.bin https://osf.io/download/s45vz
#RUN wget -O /app/public/tfjs_target_dir/group1-shard5of23.bin https://osf.io/download/zn9my
#RUN wget -O /app/public/tfjs_target_dir/group1-shard6of23.bin https://osf.io/download/uxhb7
#RUN wget -O /app/public/tfjs_target_dir/group1-shard7of23.bin https://osf.io/download/3tqen
#RUN wget -O /app/public/tfjs_target_dir/group1-shard8of23.bin https://osf.io/download/jvb9h
#RUN wget -O /app/public/tfjs_target_dir/group1-shard9of23.bin https://osf.io/download/hce29
#RUN wget -O /app/public/tfjs_target_dir/group1-shard10of23.bin https://osf.io/download/yf279
#RUN wget -O /app/public/tfjs_target_dir/group1-shard11of23.bin https://osf.io/download/zdm62
#RUN wget -O /app/public/tfjs_target_dir/group1-shard12of23.bin https://osf.io/download/6sfmz
#RUN wget -O /app/public/tfjs_target_dir/group1-shard13of23.bin https://osf.io/download/t4kx9
#RUN wget -O /app/public/tfjs_target_dir/group1-shard14of23.bin https://osf.io/download/kezbu
#RUN wget -O /app/public/tfjs_target_dir/group1-shard15of23.bin https://osf.io/download/adhwr
#RUN wget -O /app/public/tfjs_target_dir/group1-shard16of23.bin https://osf.io/download/y6p4w
#RUN wget -O /app/public/tfjs_target_dir/group1-shard17of23.bin https://osf.io/download/jfp4n
#RUN wget -O /app/public/tfjs_target_dir/group1-shard18of23.bin https://osf.io/download/2tn8e
#RUN wget -O /app/public/tfjs_target_dir/group1-shard19of23.bin https://osf.io/download/ajmdw
#RUN wget -O /app/public/tfjs_target_dir/group1-shard20of23.bin https://osf.io/download/ptb2w
#RUN wget -O /app/public/tfjs_target_dir/group1-shard21of23.bin https://osf.io/download/fx95u
#RUN wget -O /app/public/tfjs_target_dir/group1-shard22of23.bin https://osf.io/download/tyf8p
#RUN wget -O /app/public/tfjs_target_dir/group1-shard23of23.bin https://osf.io/download/akq38

# This is the combined model.
RUN wget -O /app/public/tfjs_target_dir/model.json https://osf.io/download/j3q9n
RUN wget -O /app/public/tfjs_target_dir/group1-shard1of23.bin https://osf.io/download/kf6by
RUN wget -O /app/public/tfjs_target_dir/group1-shard2of23.bin https://osf.io/download/qe7ux
RUN wget -O /app/public/tfjs_target_dir/group1-shard3of23.bin https://osf.io/download/tf6dk
RUN wget -O /app/public/tfjs_target_dir/group1-shard4of23.bin https://osf.io/download/ce8vp
RUN wget -O /app/public/tfjs_target_dir/group1-shard5of23.bin https://osf.io/download/4sxvm
RUN wget -O /app/public/tfjs_target_dir/group1-shard6of23.bin https://osf.io/download/gkcdh
RUN wget -O /app/public/tfjs_target_dir/group1-shard7of23.bin https://osf.io/download/c9kg3
RUN wget -O /app/public/tfjs_target_dir/group1-shard8of23.bin https://osf.io/download/kah5u
RUN wget -O /app/public/tfjs_target_dir/group1-shard9of23.bin https://osf.io/download/nj2t9
RUN wget -O /app/public/tfjs_target_dir/group1-shard10of23.bin https://osf.io/download/u6vxw
RUN wget -O /app/public/tfjs_target_dir/group1-shard11of23.bin https://osf.io/download/cgpj2
RUN wget -O /app/public/tfjs_target_dir/group1-shard12of23.bin https://osf.io/download/47sgy
RUN wget -O /app/public/tfjs_target_dir/group1-shard13of23.bin https://osf.io/download/kxyps
RUN wget -O /app/public/tfjs_target_dir/group1-shard14of23.bin https://osf.io/download/mgsnx
RUN wget -O /app/public/tfjs_target_dir/group1-shard15of23.bin https://osf.io/download/v6wug
RUN wget -O /app/public/tfjs_target_dir/group1-shard16of23.bin https://osf.io/download/f52ub
RUN wget -O /app/public/tfjs_target_dir/group1-shard17of23.bin https://osf.io/download/v8cn5
RUN wget -O /app/public/tfjs_target_dir/group1-shard18of23.bin https://osf.io/download/yfb67
RUN wget -O /app/public/tfjs_target_dir/group1-shard19of23.bin https://osf.io/download/8gqmz
RUN wget -O /app/public/tfjs_target_dir/group1-shard20of23.bin https://osf.io/download/qtcax
RUN wget -O /app/public/tfjs_target_dir/group1-shard21of23.bin https://osf.io/download/75nrw
RUN wget -O /app/public/tfjs_target_dir/group1-shard22of23.bin https://osf.io/download/8f2r3
RUN wget -O /app/public/tfjs_target_dir/group1-shard23of23.bin https://osf.io/download/s9vea

COPY . .
RUN chmod -R 777 /app/

CMD ["node", "app.js"]
#CMD ["/bin/sh"]
