FROM node:19-alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

RUN mkdir -p /app/public/tfjs_target_dir
RUN wget -O /app/public/tfjs_target_dir/model.json https://osf.io/download/te3p8
RUN wget -O /app/public/tfjs_target_dir/group1-shard1of23.bin https://osf.io/download/emgkb
RUN wget -O /app/public/tfjs_target_dir/group1-shard2of23.bin https://osf.io/download/evcu7
RUN wget -O /app/public/tfjs_target_dir/group1-shard3of23.bin https://osf.io/download/f6gdu
RUN wget -O /app/public/tfjs_target_dir/group1-shard4of23.bin https://osf.io/download/s45vz
RUN wget -O /app/public/tfjs_target_dir/group1-shard5of23.bin https://osf.io/download/zn9my
RUN wget -O /app/public/tfjs_target_dir/group1-shard6of23.bin https://osf.io/download/uxhb7
RUN wget -O /app/public/tfjs_target_dir/group1-shard7of23.bin https://osf.io/download/3tqen
RUN wget -O /app/public/tfjs_target_dir/group1-shard8of23.bin https://osf.io/download/jvb9h
RUN wget -O /app/public/tfjs_target_dir/group1-shard9of23.bin https://osf.io/download/hce29
RUN wget -O /app/public/tfjs_target_dir/group1-shard10of23.bin https://osf.io/download/yf279
RUN wget -O /app/public/tfjs_target_dir/group1-shard11of23.bin https://osf.io/download/zdm62
RUN wget -O /app/public/tfjs_target_dir/group1-shard12of23.bin https://osf.io/download/6sfmz
RUN wget -O /app/public/tfjs_target_dir/group1-shard13of23.bin https://osf.io/download/t4kx9
RUN wget -O /app/public/tfjs_target_dir/group1-shard14of23.bin https://osf.io/download/kezbu
RUN wget -O /app/public/tfjs_target_dir/group1-shard15of23.bin https://osf.io/download/adhwr
RUN wget -O /app/public/tfjs_target_dir/group1-shard16of23.bin https://osf.io/download/y6p4w
RUN wget -O /app/public/tfjs_target_dir/group1-shard17of23.bin https://osf.io/download/jfp4n
RUN wget -O /app/public/tfjs_target_dir/group1-shard18of23.bin https://osf.io/download/2tn8e
RUN wget -O /app/public/tfjs_target_dir/group1-shard19of23.bin https://osf.io/download/ajmdw
RUN wget -O /app/public/tfjs_target_dir/group1-shard20of23.bin https://osf.io/download/ptb2w
RUN wget -O /app/public/tfjs_target_dir/group1-shard21of23.bin https://osf.io/download/fx95u
RUN wget -O /app/public/tfjs_target_dir/group1-shard22of23.bin https://osf.io/download/tyf8p
RUN wget -O /app/public/tfjs_target_dir/group1-shard23of23.bin https://osf.io/download/akq38

RUN chmod -R 777 /app/

CMD ["node", "app.js"]
#CMD ["/bin/sh"]
