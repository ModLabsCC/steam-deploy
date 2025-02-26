FROM steamcmd/steamcmd:ubuntu-22
RUN apt install wget ca-certificates 
COPY steam_deploy.sh /root/steam_deploy.sh
ENTRYPOINT ["/root/steam_deploy.sh"]
