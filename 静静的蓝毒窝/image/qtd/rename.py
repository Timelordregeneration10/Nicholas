import shutil,os
vpath=r"C:\Users\Nicholas\Desktop\Nicholas\frontend\application\静静的蓝毒窝-最终版\image\qtd\\"
os.chdir(vpath) #更改当前路径
vlist = os.listdir(vpath)  # 该文件夹下所有的文件（包括文件夹）
num=1
for i in vlist:
    if ".jpg" in i:
        shutil.copy(i, str(num)+".jpg")
        num+=1
    if ".png" in i:
        shutil.copy(i, str(num)+".png")
        num+=1