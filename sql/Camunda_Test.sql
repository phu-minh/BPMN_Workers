CREATE DATABASE admicro

SET DATEFORMAT dmy

Create TABLE KhachHang (
  MaKH varchar(255) PRIMARY KEY,
  TenKH VARCHAR(255),
  Zip VARCHAR(255),
  DiaChi VARCHAR(255),
  ThanhPho VARCHAR(255),
  QuocGia VARCHAR(255)
);

Create TABLE DichVu (
  MaDV VARCHAR(255) PRIMARY key,
  TenDV VARCHAR(255),
  Gia int 
);

Create TABLE HoaDon (
  MaHD VARCHAR(255) PRIMARY key,
  MaKH varchar(255), 
  TongTien int,
  NgayBan Date, 
  CONSTRAINT FK_MaKH  FOREIGN KEY (MaKH)
  REFERENCES KhachHang(MaKH)
);

CREATE TABLE CTHD (
    MaHD VARCHAR(255) not null,
    MaDV VARCHAR(255) not null,
    SL int,
    ThanhTien int,
    CONSTRAINT FK_MaHD FOREIGN KEY (MaHD)
    REFERENCES HoaDon(MaHD),
    CONSTRAINT FK_MaDV FOREIGN KEY (MaDV)
    REFERENCES DichVu(MaDV),
);


INSERT INTO DichVu VALUES ('DV01', 'Adbooking', 10);
INSERT INTO DichVu VALUEs ('DV02', 'Admarket', 20);
INSERT INTO DichVu VALUEs ('DV03', 'Admnetwork', 30);
INSERT INTO DichVu VALUEs ('DV04', 'SMB', 35);


Select * FROM DichVu where MaDV = 'DV01'

SELECT * from DichVu where TenDV like '%'

UPDate DichVu
Set TenDV = 'Adnetwork'
where MaDV = 'DV03'

Select * from KhachHang
DROP DATABASE admicro

Insert Into  KhachHang (MaKH,TenKH,Zip,DiaChi,ThanhPho,QuocGia) Values ('A01','MinhPhu','VN00', 'CMT8','HCM','Viet Nam')