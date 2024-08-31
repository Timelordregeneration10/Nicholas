import shutil,os
vpath=r"C:\Users\Nicholas\Desktop\Nicholas\frontend\application\hdwpic\image\pic\\"
os.chdir(vpath) #更改当前路径
vlist = os.listdir(vpath)  # 该文件夹下所有的文件（包括文件夹）
num=1
for i in vlist:
    if len(i)>=10:
        shutil.copy(i,str(num)+".jpg")
        num+=1